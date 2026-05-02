import pool from '@/lib/db'
import {projectViewType} from '@/types/projects';
export async function getProjectView():Promise<projectViewType[]>{
    const result = await pool.query<projectViewType>(`select p.id, p.title, p.description, coalesce(json_agg(json_build_object('title', l.title, 'url', l.url)) filter(where l.id is not null), '[]') as links from projects p left join links l on l.projectid = p.id group by p.id order by p."lastUpdate"`);
    return result.rows;
}
