"use client"
import {projectViewType, projectLinkQuery} from "@/types/projects"
import {useForm} from 'react-hook-form'
import {Button} from '@components/ui/button'
import {Input} from '@components/ui/input'
import {Textarea} from '@components/ui/textarea'
import {FieldGroup, Field} from '@components/ui/field'
import {Dialog, DialogTrigger, DialogHeader, DialogTitle, DialogFooter, DialogContent, DialogClose, DialogDescription} from '@components/ui/dialog'
import {useState} from 'react'
import {Label} from '@components/ui/label'
import {createLink, deleteLink} from '@admin/actions/links'
export default function Editor({project}: {project: projectViewType}) {
    const [linkEditorOpen, setLinkEditorOpen] = useState(false);
    const [editingLink, setEditingLink] = useState<projectLinkQuery | null>(null);
    const {register: registerProject} = useForm<projectViewType>({defaultValues: project});
    const {register: registerLink, reset: resetLink, handleSubmit: handleSubmitLink, setError: setErrorLink} = useForm<projectLinkQuery>({defaultValues: {title: "New", url: "https://", projectID: project.id}})
    function openNewLink() {
        setEditingLink(null);
        resetLinkEditor();
        setLinkEditorOpen(true);
    }
    function resetLinkEditor() {
        resetLink({title: "New", url: "https://", projectID:project.id});
    }
    function openEditLink(link: projectLinkQuery) {
        setEditingLink(link);
        resetLink(link);
        setLinkEditorOpen(true);
    }
    const onSubmitLink = async (data: projectLinkQuery)=>{
        setLinkEditorOpen(false);
        try{
            await createLink(data);
        }catch(err){
            setErrorLink("root", {message:"Failed to create link"});
        }
    }
    return (
        <>
            <div className="flex justify-between items-end mb-8 p-2">
                <h2 className="text-3xl font-bold uppercase tracking-wider">
                    Project Editor
                </h2>
            </div>
            <div className="border mx-2 p-2">
                <form className="flex flex-col gap-2" onSubmit={handleSubmitLink(onSubmitLink)}>
                    <FieldGroup className="flex flex-row" >
                        <Field>
                            <Input {...registerProject("title")} className="text-4xl h-full uppercase tracking-tighter border rounded-none text-white bg-transparent focus:border-white border-zinc-600" />
                        </Field>
                        <Dialog open={linkEditorOpen} onOpenChange={(isOpen) => {
                            setLinkEditorOpen(isOpen);
                            if (!isOpen) {
                                resetLinkEditor();
                            }
                        }}>
                            <DialogTrigger className="flex gap-2">

                                {project.links.length > 0 &&
                                    project.links.map((link) =>
                                    (<span key={link.id} className="text-xs border border-zinc-500 px-2 py-1 hover:bg-white hover:text-black transition-colors cursor-pointer flex" onClick={()=>{openEditLink(link)}}>{link.title}</span>
                                    ))}
                                <Button className="text-xs border border-zinc-500 px-2 py-1 hover:bg-white hover:text-black transition-colors cursor-pointer items-center flex rounded-none" onClick={() => openNewLink()}>Add Link</Button>
                            </DialogTrigger>
                            <DialogContent className="bg-neutral-950 rounded-none p-4 text-white overflow-y-auto max-h-[90vh] [&>button]:rounded-none [&>button]:cursor-pointer">
                                <DialogHeader>
                                    <DialogTitle>
                                        {editingLink ? "Edit" : "New"}
                                    </DialogTitle>
                                    <form>
                                        <FieldGroup className="mb-2">
                                            <Field>
                                                <Label className="text-zinc-600">Text</Label>
                                                <Input {...registerLink("title")} className="rounded-none outline-none text-white bg-transparent border-zinc-600 focus:border-white placeholder:text-zinc-600 focus-visible:ring-0 " />
                                            </Field>
                                            <Field>
                                                <Label className="text-zinc-600">Url</Label>
                                                <Input {...registerLink("url")} className="rounded-none outline-none text-white bg-transparent border-zinc-600 focus:border-white placeholder:text-zinc-600 focus-visible:ring-0 " />
                                            </Field>
                                        </FieldGroup>
                                        <DialogFooter>
 {editingLink && <Button className="w-fit !rounded-none bg-white text-black hover:bg-red-500 hover:text-white cursor-pointer" type="button" onClick={() => {deleteLink(editingLink.id); resetLinkEditor(); setLinkEditorOpen(false)}}>Delete</Button>}
                                            <DialogClose>
                                                <Button className="w-fit !rounded-none bg-white text-black hover:bg-red-500 hover:text-white cursor-pointer" type="reset" onClick={() => {setLinkEditorOpen(false); resetLinkEditor()}}>Cancel</Button>
                                            </DialogClose>
                                            <Button className="w-fit !rounded-none bg-white text-black hover:bg-green-500 hover:text-white cursor-pointer" type="submit">Save</Button>
                                        </DialogFooter>
                                    </form>
                                </DialogHeader>

                            </DialogContent>
                        </Dialog>
                    </FieldGroup>
                    <FieldGroup className="flex">
                        <Field>
                            <Textarea {...registerProject("description")} className="text-zinc-600 border-zinc-600 rounded-none bg-transparent focus:border-white" />
                        </Field>
                    </FieldGroup>
                </form>
            </div>
        </>
    )
}
