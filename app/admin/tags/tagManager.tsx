import {tagsType} from "@/types/tags"
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from '@components/ui/table';
import {Button} from '@components/ui/button';
export default function TagManager({tags}: {tags: Array<tagsType>}) {
    return (
        <>
        <div className="flex justify-between items-end mb-8 p-2">
        <h2 className="text-3xl font-bold uppercase tracking-wider">
            tag system
        </h2>
        <Button type="button" className="bg-black !rounded-none text-white border border-white cursor-pointer uppercase transition-all hover:bg-white hover:text-black">New Tag</Button>
        </div>
        <div className="border border-[#222222] rounded overflow-hidden">
            <Table className="w-full">
                <TableCaption>Tags List</TableCaption>
                <TableHeader className="bg-[#161616]">
                <TableRow className="hover:!bg-transparent border-[#222222]">
                    <TableHead className="text-[#888888] uppercase tracking-wider px-6 py-4 font-semibold text-xs">ID</TableHead>
                    <TableHead className="text-[#888888] uppercase tracking-wider px-6 py-4 font-semibold text-xs">Title</TableHead>
                    <TableHead className="text-[#888888] uppercase tracking-wider px-6 py-4 font-semibold text-xs">Color</TableHead>
                    <TableHead className="text-[#888888] uppercase tracking-wider px-6 py-4 font-semibold text-xs">Priority Order</TableHead>
                    <TableHead className="text-[#888888] uppercase tracking-wider px-6 py-4 font-semibold text-xs text-right">Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    {tags.map((tag) => {
                        return (
                            <TableRow key={tag.id} className="hover:!bg-transparent border-0">
                                <TableCell className="py-2 px-6 text-sm align-middle text-[#888888]">{tag.id}</TableCell>
                                <TableCell className="py-2 px-6 text-sm align-middle text-[#888888]"><span className="text-xs px-2 py-0.5 border border-white/30" style={{color: tag.color}}>{tag.title}</span></TableCell>
                                <TableCell className="py-2 px-6 text-sm align-middle text-[#888888]"><span className="rounded-full shirnk-0 w-4 h-4 inline-block" style={{backgroundColor: tag.color}} /><span>{tag.color}</span></TableCell>
                                <TableCell className="py-2 px-6 text-sm align-middle text-[#888888]">{tag.priorityOrder ?? -1}</TableCell>
                                <TableCell className="py-2 px-6 text-sm align-middle text-[#888888]">
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
