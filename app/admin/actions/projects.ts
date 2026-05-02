"use server";
import pool from '@/lib/db'
import {revalidatePath} from "next/cache";
import {projectTable, projectListType, projectViewType} from '@/types/projects'
export async function getProjectById(id: number) {
    const result = await pool.query<projectViewType>(`select p.id, p.title, p.description, coalesce(json_agg(json_build_object('id',l.id, 'title', l.title, 'url',l.url)) filter (where l.id is not null), '[]') as links from projects p left join links l on l.projectid = p.id where p.id = $1 group by p.id`, [id]);
    return result.rows[0]
}
export async function getProjectList() {
    const results = await pool.query<projectListType>("select id,title from projects order by \"lastUpdate\"");
    return results.rows;
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
