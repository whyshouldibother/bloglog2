"use server";
import pool from '@/lib/db';
import TagManager from './tagManager';
export default async function Tags() {
    const result = await pool.query("select * from tags order by priorityOrder");
    const rows = result.rows;
    return (
        <div className="flex-1 md:pt-5 md:p-8 overflow-auto">
            <TagManager tags={rows}/>
        </div>
    )
}
