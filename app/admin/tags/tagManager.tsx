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
export default function TagManager({tags}: {tags: Array<tagsType>}) {
    const {register, watch, setValue, handleSubmit, setError, formState: {errors, isSubmitting}} = useForm<tagsType>();
    const previewBadgeTitle = watch("title")
    const previewBadgeColor = watch("color")
    return (
        <>
            <div className="flex justify-between items-end mb-8 p-2">
                <h2 className="text-3xl font-bold uppercase tracking-wider">
                    tag system
                </h2>
                <Dialog>
                    <DialogTrigger>
                        <Button type="button" className="bg-black !rounded-none text-white border border-white cursor-pointer uppercase transition-all hover:bg-white hover:text-black">New Tag</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-neutral-950 border-zinc-500 rounded-none p-4 text-white">
                        <DialogHeader>
                            <DialogTitle className="text-white">
                                New Tag
                            </DialogTitle>
                            <DialogDescription className="text-zinc-600">
                                Add a new tag
                            </DialogDescription>
                        </DialogHeader>
                        <form>
                            <FieldGroup>
                                <Field>
                                    <Label className="text-zinc-500">ID</Label>
                                    <Input disabled className="rounded-none outline-none text-white bg-transparent border-zinc-600 focus:border-white placeholder:text-zinc-600 focus-visible:ring-0 " />
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
                                    <Input className="rounded-none outline-none text-white bg-transparent border-zinc-600 focus:border-white placeholder:text-zinc-600 focus-visible:ring-0" type="number" />
                                </Field>
                            </FieldGroup>
                        </form>
                        <div className="flex flex-col gap-2">
                            <h2 className="text-zinc-200 text-sm">Preview</h2>
                            <Badge className="border rounded-none border-zinc-500 background-mist-950" style={{color: previewBadgeColor}}>{previewBadgeTitle || "Preview"}</Badge>
                        </div>
                        <DialogFooter>
                            <DialogClose>
                            <Button className="w-fit !rounded-none bg-white text-black hover:bg-red-500 hover:text-white" type="reset">Cancel</Button>
                            </DialogClose>
                            <Button className="w-fit !rounded-none bg-white text-black hover:bg-green-500 hover:text-white" type="submit">Save</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="border border-zinc-500 rounded-none overflow-hidden">
                <Table className="w-full">
                    <TableCaption>Tags List</TableCaption>
                    <TableHeader className="bg-neutral-900">
                        <TableRow className="hover:!bg-transparent !border-none">
                            <TableHead className="text-zinc-500 uppercase tracking-wider px-6 py-4 font-semibold text-xs">ID</TableHead>
                            <TableHead className="text-zinc-500 uppercase tracking-wider px-6 py-4 font-semibold text-xs">Title</TableHead>
                            <TableHead className="text-zinc-500 uppercase tracking-wider px-6 py-4 font-semibold text-xs">Color</TableHead>
                            <TableHead className="text-zinc-500 uppercase tracking-wider px-6 py-4 font-semibold text-xs">Priority Order</TableHead>
                            <TableHead className="text-zinc-500 uppercase tracking-wider px-6 py-4 font-semibold text-xs text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tags.map((tag) => {
                            return (
                                <TableRow key={tag.id} className="hover:!bg-transparent border-0">
                                    <TableCell className="py-2 px-6 text-sm align-middle text-zinc-400">{tag.id}</TableCell>
                                    <TableCell className="py-2 px-6 text-sm align-middle text-zinc-400">
                                        <Badge key={tag.id} className="border rounded-none border-zinc-500 background-mist-950" style={{color: tag.color}}>{tag.title}</Badge>
                                    </TableCell>
                                    <TableCell className="py-2 px-6 text-sm align-middle text-zinc-400">
                                        <div className="flex gap-2 justify-start items-center">
                                    <span className="rounded-full shirnk-0 w-4 h-4 inline-block" style={{backgroundColor: tag.color}} /><span>{tag.color}</span>

                                        </div>
                                    </TableCell>
                                    <TableCell className="py-2 px-6 text-sm align-middle text-zinc-400">{tag.priorityOrder ?? -1}</TableCell>
                                    <TableCell className="py-2 px-6 text-sm align-middle text-zinc-400">
                                        <div className="flex justify-end gap-5 text-xs text-white/60">
                                            <button className="hover:text-white">Edit</button>
                                            <button className="hover:text-red-500">Delete</button>
                                        </div>
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
