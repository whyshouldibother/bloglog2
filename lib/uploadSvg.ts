import pool from './db'

import {processSvg, assertSvgMimeType} from './svg'

export async function uploadSvg(
    file: File,
): Promise<string> {
    assertSvgMimeType(file.type);

    const raw = await file.text();

    const compressed = processSvg(raw);

    const result = await pool.query<{id:string}>("insert into imagesvg (image) values($1) on conflict (hash) do update set hash = excluded.hash returning id", [compressed])
    return result.rows[0].id;
}
