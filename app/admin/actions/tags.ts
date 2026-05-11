"use server";
import pool from '@/lib/db'
import {revalidatePath} from "next/cache";
import {tagsType} from "@/types/tags"
export async function addableTags(versionid:number){
    const results = await pool.query("select id, title, color from tags t where not exists (select 1 from tagged tg where tg.tagid=t.id and tg.versionid = $1)  order by \"priorityOrder\" ", [versionid]);
    return results.rows;
}
export async function removeTag(tagid:number){
    await pool.query("delete from tagged where id = $1", [tagid]);
    revalidatePath("/admin/projects");
}
export async function tagged(versionid:number, tagid:number){
    await pool.query("insert into tagged(tagid, versionid) values($1, $2)", [tagid, versionid]);
    revalidatePath("/admin/projects");
}
export async function createTag(data: tagsType) {
    await pool.query("insert into tags(title, color, \"priorityOrder\") values ($1, $2, $3)", [data.title, data.color, data.priorityOrder ? Number(data.priorityOrder) : null]);
    revalidatePath("/admin/tags");
}

export async function deleteTag(tagId: number) {
    await pool.query("delete from tags where id=$1", [tagId]);
    revalidatePath("/admin/tags");
}

export async function updateTag(data: tagsType) {
    try {
       const id = data.id
       const priorityOrder = (data.priorityOrder != null)?Number(data.priorityOrder):null;
       const title = data.title
       const color = data.color
       console.log(id, title, color, priorityOrder)
       const result = await pool.query("update tags set title = $1, color = $2, \"priorityOrder\" = $3 where id = $4 returning *", [title, color, priorityOrder, id]);
       revalidatePath("/admin/tags");
       console.log("rows affected:", result.rowCount);
       console.log("update rows:", result.rows[0]);
    } catch (err) {
        console.log(err);
    }
}
