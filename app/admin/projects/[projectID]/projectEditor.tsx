"use client"
import {projectViewType, projectLinkQuery, projectTodoQuery, projectVersionQuery, projectNoteQuery} from "@/types/projects"
import {useForm} from 'react-hook-form'
import {Button} from '@components/ui/button'
import {Input} from '@components/ui/input'
import {Textarea} from '@components/ui/textarea'
import {FieldGroup, Field} from '@components/ui/field'
import {Dialog, DialogHeader, DialogTitle, DialogFooter, DialogContent} from '@components/ui/dialog'
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem} from '@components/ui/dropdown-menu'
import {useState} from 'react'
import {Label} from '@components/ui/label'
import {createLink, deleteLink, updateLink} from '@admin/actions/links'
import {createTodo, updateTodo, flipTodo, deleteTodo} from '@admin/actions/todo'
import {createVersion, deleteVersion, updateVersion, createNote, deleteNote, updateNote} from '@admin/actions/versions'
import {Card, CardTitle, CardHeader, CardContent, CardDescription} from '@components/ui/card'
import {format} from "date-fns"
import {Popover, PopoverContent, PopoverTrigger} from '@components/ui/popover'
import {Command, CommandInput, CommandList, CommandGroup, CommandItem, CommandEmpty} from '@components/ui/command'
import {tagsType} from '@/types/tags'
import {addableTags, tagged, removeTag} from "../../actions/tags"
import {Badge} from "@components/ui/badge"
import {X} from 'lucide-react'
async function loadTags(versionid: number) {
    const tags = await addableTags(versionid);
    return tags
}
export default function Editor({project}: {project: projectViewType}) {
    const [tagsList, setTagsList] = useState<Record<number, tagsType[]>>({});
    const [linkEditorOpen, setLinkEditorOpen] = useState(false);
    const [editingLink, setEditingLink] = useState<projectLinkQuery | null>(null);
    const [todoEditorOpen, setTodoEditorOpen] = useState(false);
    const [editingTodo, setEditingTodo] = useState<projectTodoQuery | null>(null);
    const [versionEditorOpen, setVersionEditorOpen] = useState(false);
    const [editingVersion, setEditingVersion] = useState<projectVersionQuery | null>(null);
    const [notesEditorOpen, setNotesEditorOpen] = useState(false);
    const [editingNotes, setEditingNotes] = useState<projectNoteQuery | null>(null);
    const {register: registerProject} = useForm<projectViewType>({defaultValues: project});
    const {register: registerLink, reset: resetLink, handleSubmit: handleSubmitLink, setError: setErrorLink} = useForm<projectLinkQuery>({defaultValues: {title: "New", url: "https://", projectID: project.id}})
    const {register: registerTodo, reset: resetTodo, handleSubmit: handleSubmitTodo, setError: setErrorTodo} = useForm<projectTodoQuery>({defaultValues: {todo: "Todo", status: false, projectID: project.id}})
    const {register: registerVersion, reset: resetVersion, handleSubmit: handleSubmitVersion, setError: setErrorVersion} = useForm<projectVersionQuery>({defaultValues: {versionid: "1.0.0", projectid: project.id}});
    const {register: registerNote, reset: resetNote, handleSubmit: handleSubmitNote, setError: setErrorNote} = useForm<projectNoteQuery>();
    function openNewTodo() {
        setEditingTodo(null);
        resetTodoEditor();
        setTodoEditorOpen(true);
    }
    function resetTodoEditor() {
        resetTodo({todo: "Todo", status: false, projectID: project.id});
    }
    function openEditTodo(todo: projectTodoQuery) {
        setEditingTodo(todo);
        resetTodo(todo);
        setTodoEditorOpen(true);
    }
    function openNewLink() {
        setEditingLink(null);
        resetLinkEditor();
        setLinkEditorOpen(true);
    }
    function resetLinkEditor() {
        resetLink({title: "New", url: "https://", projectID: project.id});
    }
    function openEditLink(link: projectLinkQuery) {
        setEditingLink(link);
        resetLink(link);
        setLinkEditorOpen(true);
    }
    function resetVersionEditor() {
        resetVersion({versionid: "1.0.0", projectid: project.id});
    }
    function openNewVersion() {
        setEditingVersion(null);
        resetVersionEditor();
        setVersionEditorOpen(true);
    }
    function openEditVersion(version: projectVersionQuery) {
        setEditingVersion(version);
        resetVersion(version);
        setVersionEditorOpen(true);
    }

    function openNewNote(versionId: number) {
        setEditingNotes(null);
        resetNote({versionid: versionId, note: "New note"});
        setNotesEditorOpen(true);
    }
    function openEditNote(data: projectNoteQuery) {
        setEditingNotes(data);
        resetNote(data);
        setNotesEditorOpen(true);
    }
    const onSubmitVersion = async (data: projectVersionQuery) => {
        setVersionEditorOpen(false);
        if (editingVersion) {
            try {
                await updateVersion(data);
            } catch (err) {
                setErrorVersion("root", {message: "Failed to update version"});
            }
        } else
            try {
                await createVersion(data);
            } catch (err) {
                setErrorVersion("root", {message: "Failed to create version"});
            }
    }
    const onSubmitLink = async (data: projectLinkQuery) => {
        setLinkEditorOpen(false);
        if (editingLink) {

            try {
                await updateLink(data);
            } catch (err) {
                setErrorLink("root", {message: "Failed to update link"});
            }
        } else {
            try {
                await createLink(data);
            } catch (err) {
                setErrorLink("root", {message: "Failed to create link"});
            }
        }
    }
    const onSubmitNote = async (data: projectNoteQuery) => {
        setNotesEditorOpen(false);
        if (editingNotes) {
            try {
                await updateNote(data);
            } catch (err) {
                setErrorNote("root", {message: "Failed to update note"});
            }
        }
        else
            try {
                await createNote(data);
            }
            catch (err) {
            }
    }
    const onSubmitTodo = async (data: projectTodoQuery) => {
        setTodoEditorOpen(false);
        if (editingTodo) {
            try {
                await updateTodo(data);
            }
            catch (err) {
                setErrorTodo("root", {message: "Failed to edit todo"});
            }
        }
        else {
            try {
                await createTodo(data);
            } catch (err) {
                setErrorTodo("root", {message: "Failed to create todo"});
            }
        }
    }
    async function handleTagOpen(open: boolean, versionId: number) {
        if (!open) return;
        if (tagsList[versionId]) return;
        const tags = await loadTags(versionId);
        setTagsList(prev => ({...prev, [versionId]: tags}));
    }
    return (
        <>
            <div className="flex justify-between items-end mb-8 p-2">
                <h2 className="text-3xl font-bold uppercase tracking-wider">
                    Project Editor
                </h2>
            </div>
            <div className="border border-zinc-500 mx-2 p-2">
                <div className="flex flex-col gap-1">
                    <FieldGroup className="flex flex-row" >
                        <Field>
                            <Input {...registerProject("title")} className="text-4xl h-full uppercase tracking-tighter border rounded-none text-white focus:border-white border-zinc-600" />
                        </Field>
                        <Dialog open={linkEditorOpen} onOpenChange={(open) => {
                            setLinkEditorOpen(open);
                        }}>

                            {project.links.length > 0 &&
                                project.links.map((link) =>
                                (<span key={link.id} className="text-xs border border-zinc-500 px-2 py-1 hover:bg-white hover:text-black transition-colors cursor-pointer flex items-center" onClick={() => {openEditLink(link)}}>{link.title}</span>
                                ))}
                            <Button className="text-xs border border-zinc-500 bg-black px-2 py-1 hover:bg-white hover:text-black transition-colors cursor-pointer items-center flex rounded-none" onClick={openNewLink} type="button">Add Link</Button>
                            <DialogContent className="bg-neutral-950 rounded-none p-4 text-white overflow-y-auto max-h-[90vh] [&>button]:rounded-none [&>button]:cursor-pointer">
                                <DialogHeader>
                                    <DialogTitle>
                                        {editingLink ? "Edit Link" : "New Link"}
                                    </DialogTitle>
                                    <div>
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
                                            <Button className="w-fit !rounded-none bg-white text-black hover:bg-red-500 hover:text-white cursor-pointer" type="reset" onClick={() => {setLinkEditorOpen(false); resetLinkEditor()}}>Cancel</Button>
                                            <Button className="w-fit !rounded-none bg-white text-black hover:bg-green-500 hover:text-white cursor-pointer" type="button" onClick={handleSubmitLink(onSubmitLink)}>Save</Button>
                                        </DialogFooter>
                                    </div>
                                </DialogHeader>

                            </DialogContent>
                        </Dialog>
                    </FieldGroup>

                    <FieldGroup className="flex">
                        <Field>
                            <Textarea {...registerProject("description")} className="text-zinc-600 border-zinc-600 rounded-none bg-transparent focus:border-white" />
                        </Field>
                    </FieldGroup>
                    <div>
                        <div className="flex flex-row justify-between">
                            <h3>
                                Todo
                            </h3>
                            <Button className="text-xs border border-zinc-500  bg-black px-2 py-1 hover:bg-white hover:text-black transition-colors cursor-pointer items-center flex rounded-none" type="button" onClick={() => openNewTodo()}>Add Todo Item</Button>
                            <Dialog open={todoEditorOpen} onOpenChange={(open) => setTodoEditorOpen(open)}>
                                <DialogContent className="bg-neutral-950 rounded-none p-4 text-white overflow-y-auto max-h-[90vh] [&>button]:rounded-none [&>button]:cursor-pointer">
                                    <DialogHeader>
                                        <DialogTitle>
                                            {editingTodo ? "Edit Todo" : "New Todo"}
                                        </DialogTitle>
                                    </DialogHeader>
                                    <div className="flex flex-col gap-2">
                                        <FieldGroup className="mb-2">
                                            <Field>
                                                <Label className="text-zinc-600">Title</Label>
                                                <Input {...registerTodo("todo")} className="rounded-none outline-none text-white bg-transparent border-zinc-600 focus:border-white placeholder:text-zinc-600 focus-visible:ring-0 " />
                                            </Field>
                                            <Field className="flex flex-row">

                                                <Label className="text-zinc-600">Completed</Label>

                                                <input type="checkbox" {...registerTodo("status")} className="rounded-none outline-none text-white bg-transparent border-zinc-600 focus:border-white placeholder:text-zinc-600 focus-visible:ring-0 " />
                                            </Field>
                                        </FieldGroup>
                                        <DialogFooter>
                                            {editingTodo && <Button className="w-fit !rounded-none bg-white text-black hover:bg-red-500 hover:text-white cursor-pointer" type="button" onClick={() => {deleteTodo(editingTodo.id); resetTodoEditor(); setTodoEditorOpen(false)}}>Delete</Button>}
                                            <Button className="w-fit !rounded-none bg-white text-black hover:bg-red-500 hover:text-white cursor-pointer" type="button" onClick={() => {
                                                setTodoEditorOpen(false);
                                                resetTodoEditor();
                                            }}>Cancel</Button>
                                            <Button className="w-fit !rounded-none bg-white text-black hover:bg-green-500 hover:text-white cursor-pointer" type="submit" onClick={handleSubmitTodo(onSubmitTodo)}>Save</Button>
                                        </DialogFooter>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className="flex flex-row gap-2">
                            <Card className="rounded-none bg-black w-1/2">
                                <CardHeader className="text-zinc-400 p-0"><CardTitle>Pending</CardTitle></CardHeader>
                                <CardContent className="text-zinc-400 px-2">
                                    <ul className="space-y-2 list-none p-0">

                                        {project.pendingTodos.length > 0 ? (
                                            project.pendingTodos.map((task) => (<li className="flex gap-2 justify-between" key={task.id}>
                                                <span>{task.todo}</span>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger className="cursor-pointer">...</DropdownMenuTrigger>
                                                    <DropdownMenuContent className="border border-zinc-500 bg-neutral-950 rounded-none p-0 !min-w-0 w-fit">
                                                        <DropdownMenuGroup className="w-fit">
                                                            <DropdownMenuItem className="hover:!text-white !rounded-none cursor-pointer text-zinc-400 hover:!bg-transparent w-full h-fit" onClick={() => {flipTodo(task)}}>Done</DropdownMenuItem>
                                                            <DropdownMenuItem className="hover:!text-white !rounded-none cursor-pointer text-zinc-400 hover:!bg-transparent w-full h-fit" onClick={() => openEditTodo(task)}>Edit</DropdownMenuItem>
                                                            <DropdownMenuItem className="hover:!text-white !rounded-none cursor-pointer text-zinc-400 hover:!bg-transparent w-full h-fit" onClick={() => {deleteTodo(task.id)}}>Delete</DropdownMenuItem>

                                                        </DropdownMenuGroup>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>

                                            </li>))
                                        ) : "No pending tasks"}
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card className="rounded-none bg-black w-1/2">
                                <CardHeader className="text-zinc-600 p-0"><CardTitle>Completed</CardTitle></CardHeader>
                                <CardContent className="text-zinc-600 p-0">
                                    <ul className="space-y-2 list-none p-0">
                                        {project.completedTodos.length > 0 ? (
                                            project.completedTodos.map((task) => (<li className="flex gap-2 justify-between" key={task.id}>
                                                <span className="line-through">{task.todo}</span>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger className="cursor-pointer">...</DropdownMenuTrigger>
                                                    <DropdownMenuContent className="border border-zinc-500 bg-neutral-950 rounded-none p-0 !min-w-0 w-fit">
                                                        <DropdownMenuGroup className="w-fit">
                                                            <DropdownMenuItem className="hover:!text-white !rounded-none cursor-pointer text-zinc-400 hover:!bg-transparent w-full h-fit" onClick={() => {flipTodo(task)}}>Undo</DropdownMenuItem>
                                                            <DropdownMenuItem className="hover:!text-white !rounded-none cursor-pointer text-zinc-400 hover:!bg-transparent w-full h-fit" onClick={() => openEditTodo(task)}>Edit</DropdownMenuItem>
                                                            <DropdownMenuItem className="hover:!text-white !rounded-none cursor-pointer text-zinc-400 hover:!bg-transparent w-full h-fit" onClick={() => {deleteTodo(task.id)}}>Delete</DropdownMenuItem>
                                                        </DropdownMenuGroup>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </li>))
                                        ) : "Nothing done yet"}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div >
                <div>
                    <div className="flex flex-row justify-between">
                        <h3>
                            Versions
                        </h3>
                        <Button className="text-xs border border-zinc-500  bg-black px-2 py-1 hover:bg-white hover:text-black transition-colors cursor-pointer items-center flex rounded-none" type="button" onClick={() => openNewVersion()}>Add New Version</Button>
                    </div>
                    <Dialog open={versionEditorOpen} onOpenChange={(open) => {setVersionEditorOpen(open)}}>
                        <DialogContent className="bg-neutral-950 rounded-none p-4 text-white overflow-y-auto max-h-[90vh] [&>button]:rounded-none [&>button]:cursor-pointer">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingVersion ? "Edit Version" : "New Version"}
                                </DialogTitle>
                            </DialogHeader>
                            <FieldGroup>
                                <Field>
                                    <Label className="text-zinc-600">Version ID</Label>
                                    <Input {...registerVersion("versionid")} className="rounded-none outline-none text-white bg-transparent border-zinc-600 focus:border-white placeholder:text-zinc-600 focus-visible:ring-0" />
                                </Field>
                                <Field>
                                    <Label className="text-zinc-600">Description</Label>
                                    <Textarea {...registerVersion("description")} className="rounded-none outline-none text-white bg-transparent border-zinc-600 focus:border-white placeholder:text-zinc-600 focus-visible:ring-0" />
                                </Field>
                                <Field>
                                    <Label className="text-zinc-600">Creation Date</Label>
                                    <Input {...registerVersion("creation")} type="date" className="rounded-none outline-none text-white bg-transparent border-zinc-600 focus:border-white placeholder:text-zinc-600 focus-visible:ring-0" />
                                </Field>
                            </FieldGroup>

                            <DialogFooter>
                                {editingVersion && <Button className="w-fit !rounded-none bg-white text-black hover:bg-red-500 hover:text-white cursor-pointer" type="button" onClick={() => {deleteVersion(editingVersion.id); resetVersionEditor(); setVersionEditorOpen(false)}}>Delete</Button>}
                                <Button className="w-fit !rounded-none bg-white text-black hover:bg-red-500 hover:text-white cursor-pointer" type="reset" onClick={() => {setEditingVersion(null); setVersionEditorOpen(false); resetVersionEditor()}}>Cancel</Button>
                                <Button className="w-fit !rounded-none bg-white text-black hover:bg-green-500 hover:text-white cursor-pointer" type="button" onClick={handleSubmitVersion(onSubmitVersion)}>Save</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <div className="flex flex-col-reverse gap-2">
                        {project.versions.map((version) => (
                            <Card className="rounded-none bg-black border border-zinc-800" size="sm">
                                <Dialog open={notesEditorOpen} onOpenChange={(open) => setNotesEditorOpen(open)}>
                                    <DialogContent className="bg-neutral-950 rounded-none p-4 text-white overflow-y-auto max-h-[90vh] [&>button]:rounded-none [&>button]:cursor-pointer">
                                        <DialogHeader>
                                            <DialogTitle>
                                                {editingNotes ? "Edit Note" : "New Note"}
                                            </DialogTitle>
                                        </DialogHeader>
                                        <FieldGroup>
                                            <Field>
                                                <Label className="text-zinc-600">Note</Label>
                                                <Input {...registerNote("note")} className="rounded-none outline-none text-white bg-transparent border-zinc-600 focus:border-white placeholder:text-zinc-600 focus-visible:ring-0" />
                                            </Field>
                                        </FieldGroup>
                                        <DialogFooter>
                                            {editingNotes && <Button className="w-fit !rounded-none bg-white text-black hover:bg-red-500 hover:text-white cursor-pointer" type="button" onClick={() => {deleteNote(editingNotes.id); resetNote({}); setNotesEditorOpen(false)}}>Delete</Button>}
                                            <Button className="w-fit !rounded-none bg-white text-black hover:bg-red-500 hover:text-white cursor-pointer" type="reset" onClick={() => {setEditingNotes(null); setNotesEditorOpen(false); resetNote({})}}>Cancel</Button>
                                            <Button className="w-fit !rounded-none bg-white text-black hover:bg-green-500 hover:text-white cursor-pointer" type="button" onClick={handleSubmitNote(onSubmitNote)}>Save</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <CardHeader className="text-zinc-400">
                                    <div className="flex flex-rows justify-between">
                                        <div>
                                            <CardTitle>Version: {version.versionid}</CardTitle>
                                            {version.creation && (<time>{format(new Date(version.creation), "do MMMM yyyy")}</time>)}
                                        </div>
                                        <div className="flex gap-1">
                                            {version.tags.map(tag => (
                                                <span className="relative" key={tag.id}>
                                                    <Button className="absolute -top-1.5 -right-1.5 size-3.5 rounded-full hover:bg-white cursor-pointer" onClick={() => {removeTag(tag.id); console.log("removing tag")}}>
                                                        <X />
                                                    </Button>
                                                    <Badge className="border rounded-none border-zinc-500 bg-mist-950" style={{color: tag.color}}>
                                                        {tag.title}
                                                    </Badge>
                                                </span>
                                            ))}
                                        </div>
                                        <Popover onOpenChange={open => handleTagOpen(open, version.id)}>
                                            <PopoverTrigger>
                                                <Button className="text-xs border border-zinc-500  bg-black px-2 py-1 hover:bg-white hover:text-black transition-colors cursor-pointer items-center flex rounded-none"  >Add Tag</Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="bg-neutral-950 rounded-none p-0 text-white border w-fit border-zinc-500">
                                                <Command className="bg-neutral-950 rounded-none p-1 text-white !rounded-none w-fit">
                                                    <CommandInput placeholder="Search Tags" className="!bg-transparent" />
                                                    <CommandList className="p-1 w-fit">
                                                        <CommandEmpty className="p-1">
                                                            No Tag found.
                                                        </CommandEmpty>
                                                        <CommandGroup className="w-fit">
                                                            {tagsList[version.id] && tagsList[version.id].map(tag => (<CommandItem key={tag.id} style={{color: tag.color}} className="p-0 rounded-none cursor-pointer !bg-mist-950 break-words" onSelect={() => {tagged(version.id, tag.id)}}>{tag.title}</CommandItem>
                                                            ))}
                                                        </CommandGroup>

                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <CardDescription className="text-zinc-600">{version.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-row justify-between items-center">
                                        <h4 className="text-zinc-400">Notes</h4>
                                        <div className="flex flex-row gap-2">
                                            <Button className="text-xs border border-zinc-500  bg-black px-2 py-1 hover:bg-white hover:text-black transition-colors cursor-pointer items-center flex rounded-none" onClick={() => openNewNote(version.id)}>Add Notes</Button>
                                            <Button className="text-xs border border-zinc-500  bg-black px-2 py-1 hover:bg-white hover:text-black transition-colors cursor-pointer items-center flex rounded-none" onClick={() => openEditVersion(version)}>Edit Version</Button>
                                        </div>
                                    </div>
                                    <ul className="text-zinc-600 list-disc list-outside marker:text-zinc-600">
                                        {version.notes.map(note => (<li key={note.id}>
                                            <div className="flex flex-row justify-between">
                                                <span>{note.note}</span>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger className="cursor-pointer">...</DropdownMenuTrigger>
                                                    <DropdownMenuContent className="border border-zinc-500 bg-neutral-950 rounded-none p-0 !min-w-0 w-fit">
                                                        <DropdownMenuGroup className="w-fit">
                                                            <DropdownMenuItem className="hover:!text-white !rounded-none cursor-pointer text-zinc-400 hover:!bg-transparent w-full h-fit" onClick={() => openEditNote(note)}>Edit</DropdownMenuItem>
                                                            <DropdownMenuItem className="hover:!text-white !rounded-none cursor-pointer text-zinc-400 hover:!bg-transparent w-full h-fit" onClick={() => {deleteNote(note.id)}}>Delete</DropdownMenuItem>
                                                        </DropdownMenuGroup>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </li>))}
                                    </ul>
                                </CardContent>
                            </Card>))}
                    </div>
                </div >
            </div >
        </>
    )
}
