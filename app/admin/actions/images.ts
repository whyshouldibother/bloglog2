"use server";
import pool from '@/lib/db'
import { revalidatePath } from 'next/cache';
import {uploadSvg} from '@/lib/uploadSvg'
import {svgType} from '@/types/image'
export async function uploadCircuit(data:svgType, versionId:number){
    try{

    const imageId = await uploadSvg(data.file);
    await pool.query("insert into circuitimages(imageid, versionid, alt) values($1, $2, $3) on conflict (versionid) do update set imageid = excluded.imageid, alt = excluded.alt ", [imageId, versionId, data.altText]);
    revalidatePath("/admin/projects");
    }
    catch(e){
        console.error("upload circuit fialed:", e);
        throw e;

    }
}
