"use server";
import pool from '@/lib/db'
import {revalidatePath} from "next/cache";
import {projectTable} from '@/types/projects'
export async function getProjectList() {
    const results = await pool.query("select title from projects order by \"lastUpdate\"");
    return results.rows.map((row) => row.title);
}
export async function createProject(data: projectTable) {
    await pool.query("insert into projects(title,description, creation, \"lastUpdate\") values ($1, $2, $3, $4)", [data.title, data.description, data.creation, data.lastUpdate]);
    revalidatePath("/admin/projects");
}

export async function deleteProject(projectId: number) {
    await pool.query("delete from projects where id=$1", [projectId]);
    revalidatePath("/admin/projects");
}

export async function updateProject(data: projectTable) {
    try {
        const result = await pool.query("update projects set title = $1, description = $2, creation = $3, \"lastUpdate\" = $4 where id = $5 returning *", [data.title, data.description, data.creation, data.lastUpdate, data.id]);
        revalidatePath("/admin/projects");
    } catch (err) {
        console.log(err);
    }
}
