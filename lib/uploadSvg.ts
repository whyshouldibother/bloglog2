import pool from './db'

import {processSvg, assertSvgMimeType} from './svg'

export async function uploadSvg(
    file: File,
): Promise<string> {
    console.log("Starting Upload");
    assertSvgMimeType(file.type);

    console.log("Reading files");
    const raw = await file.text();

    console.log("Compressing");
    const compressed = processSvg(raw);

    console.log("Inserting");
    const result = await pool.query<{id:string}>("insert into imagesvg (image) values($1) on conflict (hash) do update set hash = excluded.hash returning id", [compressed])
    return result.rows[0].id;
}
