"use client";
import {Button} from '@components/ui/button'
import {useForm} from 'react-hook-form'
import {signIn} from 'next-auth/react'
import {useRouter} from 'next/navigation'
import {FieldGroup, Field} from '@components/ui/field'
import {Label} from '@components/ui/label'
import {Input} from '@components/ui/input'
type LoginForm = {
    username: string;
    password: string;
}
export default function Login() {
    const router = useRouter();
    const {
        register, handleSubmit, setError, formState: {errors, isSubmitting}
    } = useForm<LoginForm>();
    const onSubmit = async (data: {username: string; password: string}) => {
        setError('root', {message: ''});
        const res = await signIn('credentials', {username: data.username.trim(), password: data.password, redirect: false});
        if (res?.error) {
            setError('root', {message: 'Invalid username or password'})
            return
        }
        router.push('/admin');
        router.refresh()
    }
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <form className="w-1/2 min-h-[50%] border border-zinc-500 flex flex-col items-center justify-center gap-4 p-2" onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Field>
                        <Label className="text-zinc-500">Username</Label>
                        <Input {...register("username", {required: "Username is required"})} className="bg-transparent border border-zinc-600 rounded-none focus:border-white text-white placeholder:text-zinc-600" disabled={isSubmitting} placeholder="Username" />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                    </Field>
                    <Field>
                        <Label className="text-zinc-500">Password</Label>
                        <Input {...register("password", {required: "password is required"})} className="bg-transparent border border-zinc-600 rounded-none focus:border-white text-white placeholder:text-zinc-600" disabled={isSubmitting} placeholder="Password" type="password"/>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        {errors.root && <p className="text-red-500 text-sm">{errors.root.message}</p>}

                    </Field>
                    <Field>
                        <Button className="w-fit !rounded-none bg-black text-white hover:bg-white hover:text-black" disabled={isSubmitting} type="submit">{isSubmitting ? "Logging In" : "Log In"}</Button>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    )
}
