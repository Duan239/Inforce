import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React, { useCallback, useEffect, useState } from 'react'
import { shortUrlService } from '@/lib/BaseService'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from "@/components/ui/button"
import type { ShortUrl } from '@/types/ShortUrl'
import { useAuthStore } from '@/stores/AuthStore'
import { Input } from "@/components/ui/input"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Loader2 } from 'lucide-react'



const ITEMS_PER_PAGE = 10;

const UrlsPage = () => {
    const [urls, setUrls] = useState<ShortUrl[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const totalPages = Math.ceil(urls.length / ITEMS_PER_PAGE);
    const paginatedUrls = urls.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    const navigate = useNavigate();
    const { getUserId, isAdmin, token } = useAuthStore();

    const handleDelete = useCallback(async (id: number) => {
        await shortUrlService.delete(id);
        setUrls(prev => prev.filter(url => url.id !== id));
    }, []);

    const fetchUrls = async () => {
        const response = await shortUrlService.getAll();
        setUrls(response);
        setLoading(false);
    };

    useEffect(() => {
        fetchUrls();
    }, []);

    function canEdit(userId: number, urlCreatedUserId: number): boolean {
        return userId === urlCreatedUserId || isAdmin();
    }

    return (
        <div className="flex flex-col p-4 w-full">
            {getUserId() && <div className="mb-4"><AddNewUrl fetchUrls={fetchUrls} /></div>}

            <div className="h-[500px] overflow-auto border rounded-md">
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="w-6 h-6 animate-spin" />
                    </div>
                ) : (
                    <Table className='table-fixed'>
                        <TableHeader className="sticky top-0 bg-white z-10">
                            <TableRow>
                                <TableHead className='w-[50%]'>Original URL</TableHead>
                                <TableHead className='w-[10%]'>Short Code</TableHead>
                                <TableHead className='w-[20%]'>Created By</TableHead>
                                <TableHead className='w-[10%]'>Created Date</TableHead>
                                {token && <TableHead className='w-[10%]'>Actions</TableHead>}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedUrls.map((url) => (
                                <TableRow key={url.id}>
                                    <TableCell className='w-[50%] overflow-hidden truncate'>{url.originalUrl}</TableCell>
                                    <TableCell className='w-[10%]'>{url.shortCode}</TableCell>
                                    <TableCell className='w-[20%]'>{url.createdByUsername}</TableCell>
                                    <TableCell className='w-[10%]'>{new Date(url.createdDate).toLocaleDateString()}</TableCell>
                                    <TableCell className='w-[10%]'>
                                        <div className="flex gap-2">
                                            {getUserId() && <Button size="sm" onClick={() => navigate(`/urls/${url.id}`)}>Info</Button>}
                                            {canEdit(getUserId() || 0, url.createdByUserId) && <Button size="sm" variant="destructive" onClick={() => handleDelete(url.id)}>Delete</Button>}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>

            <Pagination className="mt-4">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => setPage(p => Math.max(1, p - 1))} />
                    </PaginationItem>
                    <PaginationItem>
                        <span className="px-4">{page} / {totalPages}</span>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext onClick={() => setPage(p => Math.min(totalPages, p + 1))} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default UrlsPage

const AddNewUrl = ({ fetchUrls }: { fetchUrls: () => Promise<void> }) => {
    const [url, setUrl] = useState("");

    const handleAddUrl = async () => {
        try {
            await shortUrlService.create(url);
            await fetchUrls();
            toast.success("URL added successfully");
        } catch (err: any) {
            toast.error("Couldn't add the URL", {
                description: err.response?.data?.error || "Something went wrong",
            });
        }
    }

    return (
        <div className='mb-4'>
            <div className='mb-4'>
                <label>Original URL:</label>
            </div>
            <Input
                onChange={(e) => setUrl(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 mr-4 mb-4"
                type="text"
                placeholder="Enter original URL"
            />
            <Button onClick={handleAddUrl}>Add New URL</Button>
        </div>
    )
}
