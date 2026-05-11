"use server";
import pool from '@/lib/db';
import {revalidatePath} from 'next/cache';
import { projectTodoQuery } from '@/types/projects';
export async function createTodo(data: projectTodoQuery){
    await pool.query("insert into todolist(todo, status, projectid) values($1, $2, $3)", [data.todo, data.status, data.projectID])
    revalidatePath("/admin/projects");
}
export async function deleteTodo(todoId: number){
    await pool.query("delete from todolist where id=$1", [todoId]);
    revalidatePath("/admin/projects/");
}
export async function flipTodo(data: projectTodoQuery){
    await pool.query("update todolist set status=$1 where id=$2" , [!data.status, data.id]);
    revalidatePath("/admin/projects");
}
export async function updateTodo(data: projectTodoQuery){
    try{
        const result = await pool.query("update todolist set todo = $1, status = $2  where id = $3 returning *", [data.todo, data.status, data.id]);
        revalidatePath("/admin/projects/");
    }catch(err){
        console.log(err);
    }
}
