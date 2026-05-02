'use server'
import pool from '@/lib/db'
import ProjectManager from './projectManager'
export default async function Projects() {
    const result = await pool.query("select * from projects order by \"lastUpdate\"");
    const rows = result.rows;
    return (
        <><ProjectManager projects={rows} /></>
    )
};
