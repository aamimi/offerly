import {useQuery} from '@tanstack/react-query';
import {Button} from "@ui/button.tsx";
import {format} from 'date-fns';
import {ErrorMessage, LoadingSpinner} from "@components/QueryWrapper.tsx";
import {IProductComment, IProductCommentsResponse} from '@interfaces/Product/ProductComments';
import React from "react";
import {fetchProductComments} from '@api/comments';
import {ChevronLeft, ChevronRight} from "lucide-react";

interface ProductCommentsProps {
    slug: string;
    total: number;
}

const ProductComments = ({slug, total}: ProductCommentsProps) => {
    const [page, setPage] = React.useState(1);

    const {data: response, isLoading, isError, error} = useQuery<IProductCommentsResponse>({
        queryKey: ['product-comments', slug, page],
        queryFn: () => fetchProductComments(slug, page),
    });

    if (isLoading) return <LoadingSpinner/>;
    if (isError) return <ErrorMessage error={error.message}/>;
    if (!response) return <ErrorMessage error={'response not defined'}/>;

    const {data: comments, meta, links} = response;

    return (
        <div className="card">
            <h2 className="mb-4">Comments</h2>
            <div className="space-y-8">
                {comments.map((comment: IProductComment) => (
                    <div key={comment.uuid} className="border-b pb-4 border-color">
                        <div className="flex justify-between items-start mb-2">
                            <div className="font-medium text-zinc-600 dark:text-zinc-400">
                                {comment.user.first_name} {comment.user.last_name}
                                <span className="text-zinc-500 text-sm ml-2">@{comment.user.username}</span>
                            </div>
                            <div className="text-sm text-zinc-500">
                                {format(new Date(comment.created_at), 'MMM d, yyyy')}
                            </div>
                        </div>
                        <p>{comment.content}</p>
                    </div>
                ))}

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
                    <div className="text-sm text-zinc-500 order-2 sm:order-none">
                        Showing {meta.from} - {meta.to} of {total} comments
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto order-1 sm:order-none">
                        <Button
                            onClick={() => setPage(page - 1)}
                            disabled={!links.prev}
                            className={'flex-1 sm:flex-initial'}
                            title="Previous Page">
                            <ChevronLeft/>
                        </Button>
                        <Button
                            onClick={() => setPage(page + 1)}
                            disabled={!links.next}
                            className={'flex-1 sm:flex-initial'}
                            title="Next Page">
                            <ChevronRight/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductComments; 