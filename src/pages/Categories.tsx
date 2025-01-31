import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@api/categories';
import { Helmet } from 'react-helmet';
import Category from '@components/category/Category';
import SubCategoryType from '@components/category/SubCategoryType';

interface Category {
    id: string;
    name: string;
    slug: string;
    subCategories: SubCategoryType[];
}

const Categories = () => {
    const { data: categories, isLoading, isError, error } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetchCategories(),
    });

    if (isLoading) return <div className="container mx-auto py-4" aria-live="polite">Loading...</div>;
    if (isError) return <div className="container mx-auto py-4" aria-live="polite">Error: {error.message}</div>;

    return (
        <>
            <Helmet>
                <title>Categories</title>
                <meta name="description" content="Browse all categories grouped by parent category." />
            </Helmet>
            <div className="container mx-auto">
                {categories.map((category: Category) => (
                    <Category
                        key={category.id}
                        id={category.id}
                        name={category.name}
                        slug={category.slug}
                        subCategories={category.subCategories}
                    />
                ))}
            </div>
        </>
    );
};

export default Categories;