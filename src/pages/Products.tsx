import {useInfiniteQuery} from '@tanstack/react-query';
import {fetchProducts} from '@api/products';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductListCard from "@components/product/ProductListCard.tsx";
import {Helmet} from 'react-helmet';
import {ErrorMessage, LoadingSpinner} from "@components/QueryWrapper.tsx";
import {useParams, useSearchParams} from "react-router-dom";

const PER_PAGE = 10;

const Products = () => {
    const {category} = useParams();
    const [searchParams] = useSearchParams();
    const searchQuery: string | undefined = searchParams.get('search') || undefined;
    const {
        data,
        fetchNextPage,
        hasNextPage,
        status,
        error
    } = useInfiniteQuery({
        queryKey: ['products', category, searchQuery],
        queryFn: ({pageParam = 0}) => fetchProducts(PER_PAGE, pageParam * PER_PAGE, category, searchQuery),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.data.length < PER_PAGE) return undefined;
            return allPages.length;
        },
        initialPageParam: 0
    });
    if (status === 'pending') return <LoadingSpinner/>;
    if (status === 'error') return <ErrorMessage error={error.message}/>;

    const products = data?.pages.flatMap(page => page.data) ?? [];

    return (
        <>
            <Helmet>
                <title>Offerly services and products</title>
                <meta name="description" content="Dynamic description for the page."/>
            </Helmet>
            <div className="container mx-auto">
                <InfiniteScroll
                    dataLength={products.length}
                    next={fetchNextPage}
                    hasMore={hasNextPage ?? false}
                    loader={
                        <div className="text-center py-4" aria-live="polite">
                            Loading more products...
                        </div>
                    }
                    endMessage={
                        <div className="text-center py-4 text-gray-500" aria-live="polite">
                            No more products to load.
                        </div>
                    }
                    scrollThreshold="90%"
                >
                    <div className="grid grid-cols-1 gap-2">
                        {products.map((product) => (
                            <ProductListCard
                                key={product.slug}
                                product={product}
                            />
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </>
    );
};

export default Products;