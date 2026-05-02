"use client";
import {useState} from 'react';
import {projectTable} from '@/types/projects'
import {Dialog, DialogTrigger, DialogHeader, DialogTitle, DialogFooter, DialogContent, DialogClose, DialogDescription} from '@components/ui/dialog';
import {Button} from '@components/ui/button';
import {Input} from '@components/ui/input';
import {Label} from '@components/ui/label';
import {FieldGroup, Field} from '@components/ui/field';
import {useForm} from 'react-hook-form'
import {Textarea} from '@/components/ui/textarea'
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from '@components/ui/table';
import {createProject, updateProject, deleteProject} from '@admin/actions/projects'
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem} from '@components/ui/dropdown-menu'
export default function ProjectManger({projects}: {projects: Array<projectTable>}) {
    const [open, setOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<projectTable | null>(null);
    const today = new Date();
    const formatDate = (date?: string | null | Date) => {
        if (!date) return "";
        const d = new Date(date);
        if (isNaN(d.getTime())) return "";
        const year = d.getUTCFullYear();
        const month = String(d.getUTCMonth() + 1).padStart(2, '0');
        const day = String(d.getUTCDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const {register, handleSubmit, watch, setError, reset, formState: {errors, isSubmitting}} = useForm<projectTable>({
        defaultValues: {
            creation: formatDate(today),
            lastUpdate: formatDate(today),
        }
    });
    console.log(watch())
    function resetEdit() {
        reset({title: "", description: "", creation: formatDate(today), lastUpdate: formatDate(today)})
    }
    function openNew() {
        setEditingProject(null);
        resetEdit();
        setOpen(true);
    }
    function openEdit(project: projectTable) {
        setEditingProject(project);
        reset({
            ...project,
            creation: formatDate(project.creation),
            lastUpdate: formatDate(project.lastUpdate),
        });
        setOpen(true);
    }
    const onSubmit = async (data: projectTable) => {
        setOpen(false);
        if (editingProject) {
            try {
                await updateProject(data);
            } catch (err) {
                setError("root", {message: "Failed to update project"});

            }
        } else {
            try {
                await createProject(data);
            } catch (err) {
                setError("root", {message: "Failed to create project"});
            }
        }
    }
    return (
        <>
            <div className="flex justify-between items-end mb-8 p-2">
                <h2 className="text-3xl font-bold uppercase tracking-wider">
                    Project Management
                </h2>

                <Dialog open={open} onOpenChange={(isOpen) => {
                    setOpen(isOpen);
                    if (!isOpen) {
                        resetEdit();
                    }
                }}>
                    <DialogTrigger>
                        <Button type="button" className="bg-black !rounded-none text-white border border-white cursor-pointer uppercase transition-all hover:bg-white hover:text-black" onClick={openNew}>New Project</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-neutral-950 border-zinc-500 rounded-none p-4 text-white overflow-y-auto max-h-[90vh] [&>button]:rounded-none [&>button]:cursor-pointer">
                        <DialogHeader>
                            <DialogTitle className="text-white">
                                {editingProject ? "Edit" : "New"} Project
                            </DialogTitle>
                            <DialogDescription className="text-zinc-600">
                                Add a new project
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FieldGroup className="mb-2">
                                <Field>
                                    <Label className="text-zinc-500">ID</Label>
                                    <Input disabled {...register("id")} className="rounded-none outline-none text-white bg-transparent border-zinc-600 focus:border-white placeholder:text-zinc-600 focus-visible:ring-0 " />
                                </Field>
                                <Field>
                                    <Label className="text-zinc-500">Title</Label>
                                    <Input {...register("title")} className="rounded-none outline-none text-white bg-transparent border-zinc-600 focus:border-white placeholder:text-zinc-600 focus-visible:ring-0 " />
                                </Field>
                                <Field>
                                    <Label className="text-zinc-500">Description</Label>
                                    <Textarea {...register("description")} className="rounded-none outline-none text-white bg-transparent border-zinc-600 focus:border-white placeholder:text-zinc-600 focus-visible:ring-0" />
                                </Field>
                                <Field>
                                    <Label className="text-zinc-500">Creation Date</Label>
                                    <input type="date" {...register("creation")} className="rounded-none outline-none text-white bg-transparent border-zinc-600 focus:border-white placeholder:text-zinc-600 focus-visible:ring-0" />
                                </Field>
                                <Field>
                                    <Label className="text-zinc-500">Last Updated</Label>
                                    <input type="date" {...register("lastUpdate")} className="rounded-none outline-none text-white bg-transparent border-zinc-600 focus:border-white placeholder:text-zinc-600 focus-visible:ring-0" />
                                </Field>

                            </FieldGroup>
                            <DialogFooter>
                                {editingProject && <Button className="w-fit !rounded-none bg-white text-black hover:bg-red-500 hover:text-white cursor-pointer" type="button" onClick={() => {deleteProject(editingProject.id); resetEdit(); setOpen(false)}}>Delete</Button>}
                                <DialogClose>
                                    <Button className="w-fit !rounded-none bg-white text-black hover:bg-red-500 hover:text-white cursor-pointer" type="reset" onClick={() => {setOpen(false); resetEdit();}}>Cancel</Button>
                                </DialogClose>
                                <Button className="w-fit !rounded-none bg-white text-black hover:bg-green-500 hover:text-white cursor-pointer" type="submit">Save</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="border border-zinc-500 rounded-none overflow-hidden w-[90%] mx-auto">
                <Table className="w-full table-fixed">
                    <TableCaption>Projects List</TableCaption>
                    <colgroup>
                        <col className="w-[5%]" />
                        <col className="w-[30%]" />
                        <col className="w-[55%]" />
                        <col className="w-[10%]" />
                    </colgroup>
                    <TableHeader className="bg-neutral-900">
                        <TableRow className="hover:!bg-transparent !border-none">
                            <TableHead className="text-zinc-500 uppercase tracking-wider px-2 py-2 text-center py-4 font-semibold text-xs">ID</TableHead>
                            <TableHead className="text-zinc-500 uppercase tracking-wider px-2 py-2 font-semibold text-xs">Title</TableHead>
                            <TableHead className="text-zinc-500 uppercase tracking-wider px-2 py-2 font-semibold text-xs">Description</TableHead>
                            <TableHead className="text-zinc-500 uppercase tracking-wider px-2 py-2 font-semibold text-xs">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="overflow-y-auto">
                        {projects.map((project) => {
                            return (
                                <TableRow key={project.id} className="hover:!bg-transparent !border-0 has-aria-expanded:!bg-transparent data-[state=selected]:!bg-transparent">
                                    <TableCell className="py-2 px-2 text-sm align-middle text-zinc-400">{project.id}</TableCell>
                                    <TableCell className="py-2 px-2 text-sm align-middle text-zinc-400 break-words whitespace-normal">{project.title}</TableCell>
                                    <TableCell className="py-2 px-2 text-sm align-middle text-zinc-400 break-words whitespace-normal">{project.description}</TableCell>
                                    <TableCell className="py-2 px-2 text-sm align-middle text-zinc-400">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="cursor-pointer">...</DropdownMenuTrigger>
                                            <DropdownMenuContent className="border border-zinc-500 bg-neutral-950 rounded-none p-0 !min-w-0 w-fit">
                                                <DropdownMenuGroup className="w-fit">
                                                    <DropdownMenuItem className="hover:!text-white !rounded-none cursor-pointer text-zinc-400 hover:!bg-transparent w-full" onClick={() => openEdit(project)}>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem className="hover:!text-red-500 !rounded-none cursor-pointer text-zinc-400 hover:!bg-transparent w-full" onClick={() => {deleteProject(project.id)}}>Delete</DropdownMenuItem>
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        )
                        }
                    </TableBody>
                </Table>
            </div>
        </>)
}
