import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { aboutService } from '@/lib/BaseService'
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/AuthStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react'

const AboutPage = () => {
    const { isAdmin } = useAuthStore();

    const { data: about, isLoading } = useQuery({
        queryKey: ['about'],
        queryFn: aboutService.get
    });

    return (
        <div className="p-6 max-w-2xl mx-auto">


            {isLoading ? (
                <div className="flex items-center justify-center p-6">
                    <Loader2 className="w-6 h-6 animate-spin" />
                </div>
            ) : (
                <Card className='mx-auto'>
                    <CardHeader>
                        <CardTitle className="text-2xl">About the algorithm</CardTitle>
                    </CardHeader>
                    <CardContent className='flex flex-col gap-6 pt-6'>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap break-all">{about?.about}</p>
                        {isAdmin() && (
                            <>
                                <Separator className="my-4" />
                                <p className="text-sm font-medium mb-2">Edit Description</p>
                                <EditAbout initialAbout={about?.about || ''} />
                            </>
                        )}
                    </CardContent>
                </Card>
            )
            }
        </div>
    )
}

export default AboutPage;

const EditAbout = ({ initialAbout }: { initialAbout: string }) => {
    const [aboutState, setAboutState] = React.useState(initialAbout);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: aboutService.update,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['about'] });
        }
    });

    return (
        <div className="flex gap-2">
            <Textarea
                value={aboutState}
                onChange={(e) => setAboutState(e.target.value)}
                placeholder="Enter description..."
                className="flex-1 break-all"
            />
            <Button onClick={() => mutation.mutate(aboutState)} disabled={mutation.isPending}>
                {mutation.isPending ? 'Saving...' : 'Save'}
            </Button>
        </div>
    )
}