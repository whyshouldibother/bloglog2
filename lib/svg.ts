import {optimize} from "svgo";
import {brotliCompressSync, brotliDecompressSync} from "zlib";
import {DOMParser, XMLSerializer} from '@xmldom/xmldom'
function sanitizeSvg(raw: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(raw, "image/svg+xml");

    const parseError = doc.getElementsByTagName("parseerror")
    if (parseError.length > 0) throw new Error("Invalid SVG.");

    const svg = doc.getElementsByTagName("svg")[0];
    if (!svg) throw new Error("No <svg> element found.");

    const bannedTags = ["script", "foreignObject", "animate", "set"];
    const bannedAttrPrefixes = ["on"];
    const bannedAttrs = ["href", "xlink:href"];

    bannedTags.forEach((tag) => {
        Array.from(svg.getElementsByTagName(tag)).forEach((el) => el.parentNode?.removeChild(el));
    })


    const allElements = svg.getElementsByTagName("*");
    Array.from(allElements).forEach((el) => {
        Array.from(el.attributes).forEach((attr) => {
            const name = attr.name.toLowerCase();
            if (bannedAttrPrefixes.some((p) => name.startsWith(p)) || bannedAttrs.includes(name)) {
                el.removeAttribute(attr.name);
            }
        });
    })
    return new XMLSerializer().serializeToString(svg);
}

function optimizeSvg(sanitized: string): string {
    const result = optimize(sanitized, {plugins: ["removeComments", "removeMetadata", "removeDoctype", "removeXMLProcInst", "removeTitle", "removeDesc", "mergePaths", "collapseGroups", {name: "convertPathData", params: {floatPrecision: 2}}, {name: "cleanupNumericValues", params: {floatPrecision: 2}}, {name: "convertTransform", params: {floatPrecision: 2}}]});
    return result.data;
}

export function processSvg(raw: string): Buffer {
    const sanitized = sanitizeSvg(raw);
    const optimized = optimizeSvg(sanitized);
    return brotliCompressSync(Buffer.from(optimized, "utf8"));
}

export function decompressSvg(compressed: Buffer): string {
    return brotliDecompressSync(compressed).toString("utf8")
}

export function assertSvgMimeType(mimeType: string): void {
    const allowed = ["image/svg+xml", "text/plain", "application/xml", "text/xml"];
    if (!allowed.includes(mimeType)) {
        throw new Error(`Invalid file type: ${mimeType}. Expected an SVG.`);
    }
}
