import {useInfiniteQuery} from '@tanstack/react-query';
import {fetchProducts} from '@api/products';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductListCard from "@components/Product/ProductListCard.tsx";
import {Helmet} from 'react-helmet';

const PRODUCTS_PER_PAGE = 10;

const Products = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        status,
        error
    } = useInfiniteQuery({
        queryKey: ['products'],
        queryFn: ({pageParam = 0}) => fetchProducts(PRODUCTS_PER_PAGE, pageParam * PRODUCTS_PER_PAGE),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.products.length < PRODUCTS_PER_PAGE) return undefined;
            return allPages.length;
        },
        initialPageParam: 0
    });

    if (status === 'pending')
        return <div className="container mx-auto py-4" aria-live="polite">Loading...</div>;
    if (status === 'error')
        return <div className="container mx-auto py-4" aria-live="polite">Error: {error.message}</div>;

    const products = data?.pages.flatMap(page => page.products) ?? [];

    return (
        <>
            <Helmet>
                <title>Offerly services and products</title>
                <meta name="description" content="Dynamic description for the page." />
            </Helmet>
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
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </InfiniteScroll>
        </>
    );
};

export default Products;