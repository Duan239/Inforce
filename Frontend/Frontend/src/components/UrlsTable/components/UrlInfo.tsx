import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { shortUrlService } from '@/lib/BaseService'
import type { ShortUrl } from '@/types/ShortUrl'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Link2, Code, User, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Loader2 } from 'lucide-react'


const UrlInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [url, setUrl] = useState<ShortUrl | null>(null);


    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUrl = async () => {
            const response = await shortUrlService.getById(Number(id));
            setUrl(response);
            setLoading(false);
        };
        fetchUrl();
    }, [id]);

    if (!url) return (
        <div className="flex items-center justify-center h-full p-8">
            <p className="text-gray-500 animate-pulse">Loading...</p>
        </div>
    );

    return (
        <div className="p-6 w-full">
            <Button variant="ghost" className="mb-4 gap-2" onClick={() => navigate('/urls')}>
                <ArrowLeft className="w-4 h-4" /> Back
            </Button>



            {loading ? (
                <div className="flex items-center justify-center h-[400px]">
                    <Loader2 className="w-6 h-6 animate-spin" />
                </div>
            ) : (
                <Card className='w-full max-w-2xl mx-auto'>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xl flex items-center gap-2">
                            <Link2 className="w-5 h-5" />
                            URL Info
                        </CardTitle>
                    </CardHeader>

                    <Separator />

                    <CardContent className="flex flex-col gap-4 pt-4">
                        <div className="flex flex-col gap-1">
                            <p className="text-xs text-gray-400 uppercase font-semibold flex items-center gap-1">
                                <Link2 className="w-3 h-3" /> Original URL
                            </p>
                            <a href={url.originalUrl} target="_blank" rel="noreferrer"
                                className="text-blue-500 hover:underline break-all text-sm">
                                {url.originalUrl}
                            </a>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className="text-xs text-gray-400 uppercase font-semibold flex items-center gap-1">
                                <Code className="w-3 h-3" /> Short Code
                            </p>
                            <Badge variant="secondary" className="w-fit text-sm">{url.shortCode}</Badge>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className="text-xs text-gray-400 uppercase font-semibold flex items-center gap-1">
                                <User className="w-3 h-3" /> Created By
                            </p>
                            <p className="text-sm">{url.createdByUsername}</p>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className="text-xs text-gray-400 uppercase font-semibold flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> Created Date
                            </p>
                            <p className="text-sm">{new Date(url.createdDate).toLocaleDateString()}</p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default UrlInfo