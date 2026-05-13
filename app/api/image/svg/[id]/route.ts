import {NextRequest, NextResponse} from "next/server";
import {decompressSvg} from '@/lib/svg';
import pool from '@/lib/db';

export async function GET(_req: NextRequest, {params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    const result = await pool.query<{image: Buffer}>(`select image from imagesvg where id=$1`, [id]);
    if (result.rows.length === 0) {
        return new NextResponse("Image not found.", {status: 404});
    }

    const svg = decompressSvg(result.rows[0].image);

    return new NextResponse(svg, {status: 200, headers: {"Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=31536000, immutable"}, });
}
