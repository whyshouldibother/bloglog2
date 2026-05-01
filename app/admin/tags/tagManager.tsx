"use client";
import {tagsType} from "@/types/tags"
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from '@components/ui/table';
import {Button} from '@components/ui/button';
import {Dialog, DialogClose, DialogDescription, DialogTitle, DialogTrigger, DialogHeader, DialogContent, DialogFooter} from '@components/ui/dialog'
import {Field, FieldGroup} from '@components/ui/field'
import {Label} from '@components/ui/label'
import {Input} from '@components/ui/input'
import {useForm} from 'react-hook-form'
import {Badge} from '@components/ui/badge'
import {DropdownMenu, DropdownMenuTrigger,DropdownMenuContent,DropdownMenuGroup, DropdownMenuItem} from '@components/ui/dropdown-menu'
import {createTag, deleteTag, updateTag} from '@admin/actions/tags'
import {useState} from 'react'
export default function TagManager({tags}: {tags: Array<tagsType>}) {
    const {register, watch, setValue, handleSubmit, setError, reset, formState: {errors, isSubmitting}} = useForm<tagsType>();
    const previewBadgeTitle = watch("title")
    const previewBadgeColor = watch("color")
    const [open, setOpen] = useState(false);
    const [editingTag, setEditingTag] = useState<tagsType | null>(null);
    function resetEdit() {
        reset({title: "", color: "#000000", priorityOrder: undefined});
    }
    function openNew() {
        setEditingTag(null);
        resetEdit();
        setOpen(true);
    }
    function openEdit(tag: tagsType) {
        setEditingTag(tag);
        reset(tag);
        setOpen(true);
    }
    const onSubmit = async (data: tagsType) => {
        setOpen(false);
        if (editingTag) {
            try {
                await updateTag(data);
            } catch (err) {
                setError("root", {message: "Failed to update tag"});
            }
        }
        else {
            try {
                await createTag(data);
            } catch (err) {
                setError("root", {message: "Failed to create tag"});
            }
        }
        resetEdit();
    }

    return (
        <>
            <div className="flex justify-between items-end mb-8 p-2">
                <h2 className="text-3xl font-bold uppercase tracking-wider">
                    tag system
                </h2>
                <Dialog open={open} onOpenChange={(isOpen) => {
                    setOpen(isOpen);
                    if (!isOpen) {
                        resetEdit();
                    }
                }}>
                    <DialogTrigger>
                        <Button type="button" className="bg-black !rounded-none text-white border border-white cursor-pointer uppercase transition-all hover:bg-white hover:text-black" onClick={openNew}>New Tag</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-neutral-950 border-zinc-500 rounded-none p-4 text-white overflow-y-auto max-y-[90vh] [&>button]:rounded-none [&>button]:cursor-pointer">
                        <DialogHeader>
                            <DialogTitle className="text-white">
                                New Tag
                            </DialogTitle>
                            <DialogDescription className="text-zinc-600">
                                Add a new tag
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FieldGroup>
                                <Field>
                                    <Label className="text-zinc-500">ID</Label>
                                    <Input disabled {...register("id")} className="rounded-none outline-none text-white bg-transparent border-zinc-600 focus:border-white placeholder:text-zinc-600 focus-visible:ring-0 " />
                                </Field>
                                <Field>
                                    <Label className="text-zinc-500">Title</Label>
                                    <Input {...register("title")} className="rounded-none outline-none text-white bg-transparent border-zinc-600 focus:border-white placeholder:text-zinc-600 focus-visible:ring-0 " />
                                </Field>
                                <Field>
                                    <Label className="text-zinc-500">Color</Label>
                                    <div className="flex border border-zinc-600">
                                        <Input type="color" className="w-1/4 rounded-none border-none p-0" value={previewBadgeColor}
                                            onChange={(e) => setValue("color", e.target.value)} />
                                        <Input {...register("color")} className="rounded-none outline-none text-white bg-transparent focus-visible:ring-0 border-none focus:!border-none focus:!outline-none placeholder:text-zinc-600" />
                                    </div>
                                </Field>
                                <Field>
                                    <Label className="text-zinc-500">Priority Order</Label>
                                    <Input {...register("priorityOrder")} className="rounded-none outline-none text-white bg-transparent border-zinc-600 focus:border-white placeholder:text-zinc-600 focus-visible:ring-0" type="number" />
                                </Field>
                            </FieldGroup>
                            <div className="flex flex-col gap-2">
                                <h2 className="text-zinc-200 text-sm">Preview</h2>
                                <Badge className="border rounded-none border-zinc-500 background-mist-950" style={{color: previewBadgeColor}}>{previewBadgeTitle || "Preview"}</Badge>
                            </div>
                            <DialogFooter>
                                {editingTag && <Button className="w-fit !rounded-none bg-white text-black hover:bg-red-500 hover:text-white" type="button" onClick={() => {deleteTag(editingTag.id); resetEdit(); setOpen(false)}}>Delete</Button>}
                                <DialogClose>
                                    <Button className="w-fit !rounded-none bg-white text-black hover:bg-red-500 hover:text-white" type="reset" onClick={() => {setOpen(false); resetEdit();}}>Cancel</Button>
                                </DialogClose>
                                <Button className="w-fit !rounded-none bg-white text-black hover:bg-green-500 hover:text-white" type="submit">Save</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="border border-zinc-500 rounded-none overflow-hidden w-[90%] mx-auto">
                <Table className="w-full table-fixed">
                    <colgroup>
                        <col className="w-[10%]" />
                        <col className="w-[30%]" />
                        <col className="w-[30%]" />
                        <col className="w-[20%]" />
                        <col className="w-[10%]" />
                    </colgroup>
                    <TableCaption>Tags List</TableCaption>
                    <TableHeader className="bg-neutral-900">
                        <TableRow className="hover:!bg-transparent !border-none">
                            <TableHead className="text-zinc-500 uppercase tracking-wider px-2 py-2 text-center font-semibold text-xs">ID</TableHead>
                            <TableHead className="text-zinc-500 uppercase tracking-wider px-2 py-2 font-semibold text-xs">Title</TableHead>
                            <TableHead className="text-zinc-500 uppercase tracking-wider px-2 py-2 font-semibold text-xs">Color</TableHead>
                            <TableHead className="text-zinc-500 uppercase tracking-wider px-2 py-2 font-semibold text-xs whitespace-normal">Priority Order</TableHead>
                            <TableHead className="text-zinc-500 uppercase tracking-wider px-2 py-2 font-semibold text-xs text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                            {tags.map((tag) => {
                                return (
                                    <TableRow key={tag.id} className="border-0 hover:bg-transparent has-aria-expanded:bg-transparent data-[state=selected]:bg-transparent">
                                        <TableCell className="py-2 px-2 text-center text-sm align-middle text-zinc-400">{tag.id}</TableCell>
                                        <TableCell className="py-2 px-2 text-sm align-middle text-zinc-400">
                                            <Badge key={tag.id} className="border rounded-none border-zinc-500 background-mist-950" style={{color: tag.color}}>{tag.title}</Badge>
                                        </TableCell>
                                        <TableCell className="py-2 px-2 text-sm align-middle text-zinc-400">
                                            <div className="flex gap-2 justify-start items-center">
                                                <span className="rounded-full shirnk-0 w-4 h-4 inline-block" style={{backgroundColor: tag.color}} /><span>{tag.color}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-2 px-2 text-sm align-middle text-zinc-400">{tag.priorityOrder ?? "-"}</TableCell>
                                        <TableCell className="py-2 px-2 text-sm align-middle text-zinc-400">
                                        <DropdownMenu>
                                           <DropdownMenuTrigger className="cursor-pointer">...</DropdownMenuTrigger>
                                           <DropdownMenuContent className="border border-zinc-500 bg-neutral-950 rounded-none p-0 !min-w-0 w-fit">
                                           <DropdownMenuGroup className="w-fit">
                                                <DropdownMenuItem className="hover:!text-white !rounded-none cursor-pointer text-zinc-400 hover:!bg-transparent w-full" onClick={() => openEdit(tag)}>Edit</DropdownMenuItem>
                                                <DropdownMenuItem className="hover:!text-red-500 !rounded-none cursor-pointer text-zinc-400 hover:!bg-transparent w-full" onClick={() => {deleteTag(tag.id)}}>Delete</DropdownMenuItem>
                                           </DropdownMenuGroup>
                                           </DropdownMenuContent>
                                        </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
