import pool from '@/lib/db'

export async function getProjectView(){
    const result = await pool.query("select id, title, description from projects order by \"lastUpdate\"")
    return result.rows
}
