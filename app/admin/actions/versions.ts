"use server";
import pool from '@/lib/db'
import {revalidatePath} from "next/cache";
import {projectVersionQuery, projectNoteQuery} from '@/types/projects'

export async function createVersion(data: projectVersionQuery) {
    await pool.query("insert into versions(versionid, creation, projectid, description) values(string_to_array($1,'.')::int[], $2, $3, $4)", [data.versionid, data.creation, data.projectid, data.description]);
    revalidatePath("/admin/projects");
}

export async function createNote(data: projectNoteQuery) {
    await pool.query("insert into versionnotes(note, versionid) values($1, $2)", [data.note, data.versionid]);
    revalidatePath("/admin/projects/");
}

export async function updateVersion(data: projectVersionQuery) {
    try {
        const result = await pool.query("update versions set creation = $1, versionid = string_to_array($2, '.')::int[], description = $3 where id = $4", [data.creation, data.versionid, data.description, data.id]);
        revalidatePath("/admin/projects");
    }
    catch (err) {
        console.log(err);
    }
}
export async function updateNote(data: projectNoteQuery) {
    try {
        const result = await pool.query("update versionnotes set note = $1 where id = $2", [data.note, data.id]);
        revalidatePath("/admin/projects");
    } catch (err) {
        console.log(err);
    }
}
export async function deleteVersion(versionid: number) {
    await pool.query("delete from versions where id=$1", [versionid]);
    revalidatePath("/admin/projects");
}
export async function deleteNote(noteid: number) {
    await pool.query("delete from versionnotes where id = $1", [noteid]);
    revalidatePath("/admin/projects");
}
