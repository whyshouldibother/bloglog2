import pool from '@/lib/db'
import {isAdmin} from '@/lib/isAdmin';
export async function GET() {
    try {
        const result = await pool.query('Select * from tags');
        return Response.json(result.rows);
    } catch (error) {
        return Response.json({error: (error as Error).message}, {status: 500});
    }
}
export async function POST(request: Request) {
    if(!await isAdmin()) return Response.json({error:'Unauthorized'}, {status:401});
    try{
        const {title, color, priorityOrder=null} = await request.json();
        if(!title || !color){
            return Response.json({error:"Incomplete Inputs"}, {status:400});
        }
        const result = await pool.query('Insert into tags (title, color, priorityOrder) values ($1, $2, $3) returning *)', [title, color, priorityOrder]);
        return Response.json(result.rows[0], {status:201});

    }catch(error){
        return Response.json({error: (error as Error).message}, {status:500}); 
    }
}
export async function PUT(request:Request){
    if(!await isAdmin()) return Response.json({error:'Unauthorized'}, {status:401});
    try{
        const {id, title, color, priorityOrder} = await request.json();
        if(!id) return Response.json({error:'id is required'}, {status:400});

        const fields: string[] = [];
        const values: any[] = [];
        let i = 1; 
        if(title !== undefined) {
            fields.push(`title=$${i++}`);
            values.push(title);
        }
        if(color !== undefined){
            fields.push(`color=$${i++}`);
            values.push(color);
        }
        if(priorityOrder !== undefined){
            fields.push(`priorityorder=$${i++}`);
            values.push(priorityOrder);
        }
        if(fields.length === 0) return Response.json({error:'No fields to update'}, {status:400});

        values.push(id);
        const result = await pool.query(`Update tags set ${fields.join(', ')} where id=$${1} returning *`, values);

        if(result.rowCount === 0) return Response.json({error: 'Tag not found'}, {status:404});
        return Response.json(result.rows[0]);
    }catch(error){
        return Response.json({error:(error as Error).message}, {status:500});
    }
}
export async function DELETE(request: Request){
    if(!await isAdmin()) return Response.json({error:'Unauthorized'}, {status:401});
    try{
        const {id} = await request.json();
        const result = await pool.query('DELETE from tags where id=$1 returning *', [id]);
        if(result.rowCount === 0) return Response.json({error:'Tag not found'}, {status:404});
        return Response.json(result.rows[0]);
    }catch(error){
        console.log(0)
    }
}
