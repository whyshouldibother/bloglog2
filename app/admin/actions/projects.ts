"use server";
import pool from '@/lib/db'
import {revalidatePath} from "next/cache";
import {projectTable, projectListType, projectViewType} from '@/types/projects'
export async function getProjectById(id: number) {
    const result = await pool.query<projectViewType>(`
        SELECT
            p.id,
            p.title,
            p.description,

            COALESCE(l.links, '[]') AS links,
            COALESCE(t.completed, '[]') AS "completedTodos",
            COALESCE(t.pending, '[]') AS "pendingTodos",
            coalesce(v.versions, '[]') as "versions"
        FROM projects p

        LEFT JOIN LATERAL (
            SELECT json_agg(
                jsonb_build_object(
                    'id', l.id,
                    'title', l.title,
                    'url', l.url
                )
            ) AS links
            FROM links l
            WHERE l.projectid = p.id
        ) l ON true
        left join lateral(
            select json_agg(jsonb_build_object('id', v.id, 'versionid',array_to_string(v.versionid,'.'), 'creation',v.creation, 'description',v.description, 'open', v.open,'notes', coalesce((select json_agg(jsonb_build_object('id', n.id, 'note', n.note, 'versionid', n.versionid)) from versionnotes n where n.versionid=v.id),'[]'::json), 'tags', coalesce((select json_agg(jsonb_build_object('id', tg.id, 'title', t.title,'color', t.color)) from tagged tg left join tags t on t.id = tg.tagid where tg.versionid = v.id), '[]'::json), 'circuit',coalesce((select jsonb_strip_nulls(jsonb_build_object('imageid', c.imageid, 'alt', c.alt)) from circuitimages c where c.versionid = v.id)) ) order by v.versionid) as versions from versions v where v.projectid = p.id) v on true
        LEFT JOIN LATERAL (
            SELECT
                json_agg(
                    jsonb_build_object(
                        'id', t.id,
                        'todo', t.todo,
                        'status', t.status,
                        'projectid', t.projectid
                    )
                ) FILTER (WHERE t.status = true) AS completed,

                json_agg(
                    jsonb_build_object(
                        'id', t.id,
                        'todo', t.todo,
                        'status', t.status,
                        'projectid', t.projectid
                    )
                ) FILTER (WHERE t.status = false) AS pending

            FROM todolist t
            WHERE t.projectid = p.id
        ) t ON true
        WHERE p.id = $1
    `, [id]);

    return result.rows[0];
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
