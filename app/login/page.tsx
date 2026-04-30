"use client";
import InputField from '@components/UI/inputField'
import {Button} from '@components/ui/button'
import {useForm} from 'react-hook-form'
import { signIn } from 'next-auth/react'
import {useRouter} from 'next/navigation'

type LoginForm = {
    username: string;
    password: string;
}
export default function Login(){
    const router = useRouter();
    const {
        register, handleSubmit,setError, formState: {errors, isSubmitting}
    } = useForm<LoginForm>();
    const onSubmit=async (data:{username: string; password:string})=>{
        setError('root', {message:''});
        const res = await signIn('credentials',{username:data.username.trim(), password:data.password, redirect:false});
        if(res?.error){
             setError('root', { message: 'Invalid username or password' })
            return
        }
        router.push('/admin');
        router.refresh()
    } 
    return(
            <div className="h-screen w-screen flex items-center justify-center">
                <form className="w-1/2 min-h-[50%] border flex flex-col items-center justify-center gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <InputField label="Username" type="text" disabled={isSubmitting} {...register("username", {required:"Username is required"} )}/>
                    {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                    <InputField label="Password" type="password" disabled={isSubmitting} {...register("password", {required: "Password is required"})}/>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    {errors.root && <p className="text-red-500 text-sm">{errors.root.message}</p>}
                    <Button className="w-fit !rounded-none bg-black text-white hover:bg-white hover:text-black" disabled={isSubmitting} type="submit">{isSubmitting?"Logging In":"Log In"}</Button>
                </form>
            </div>
    )
}
