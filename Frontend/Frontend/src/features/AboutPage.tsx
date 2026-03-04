import React, { useEffect } from 'react'
import { aboutService } from '@/lib/BaseService'
import type { About } from '@/types/About';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/stores/AuthStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

const AboutPage = () => {
    const [about, setAbout] = React.useState<About | null>(null);
    const { isAdmin } = useAuthStore();

    useEffect(() => {
        const fetchData = async () => {
            const response = await aboutService.get();
            setAbout(response);
        }
        fetchData();
    }, []);

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">About the algorithm</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col gap-6 pt-6'>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap break-all">{about?.about}</p>
                    {isAdmin() && (
                        <>
                            <Separator className="my-4" />
                            <p className="text-sm font-medium mb-2">Edit Description</p>
                            <EditAbout about={about} setAbout={setAbout} />
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default AboutPage;

const EditAbout = ({ about, setAbout }: { about: About | null, setAbout: (about: About) => void }) => {
    const [aboutState, setAboutState] = React.useState(about?.about || '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await aboutService.update(aboutState);
        setAbout({ about: aboutState });
    }

    return (
        <div className="flex gap-2">
            <Textarea
                value={aboutState}
                onChange={(e) => setAboutState(e.target.value)}
                placeholder="Enter description..."
                className="flex-1 break-all"
            />
            <Button onClick={handleSubmit}>Save</Button>
        </div>
    )
}