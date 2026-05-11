"use server";
import pool from '@/lib/db'
import {projectLinkQuery} from '@/types/projects'
import { revalidatePath } from 'next/cache';
export async function createLink(data: projectLinkQuery){
    await pool.query("insert into links(title, url, projectid) values($1, $2, $3)", [data.title, data.url, data.projectID]);
    revalidatePath("/admin/projects/");
}

export async function deleteLink(linkID: number){
    await pool.query("delete from links where id=$1", [linkID]);
    revalidatePath("/admin/projects/");
}
export async function updateLink(data: projectLinkQuery){
    try{
        const result = await pool.query("update links set title = $1, url = $2 where id =$3 returning *", [data.title, data.url, data.id]);
        revalidatePath("/admin/projects/");
    }catch(err){
        console.log(err);
    }
}
