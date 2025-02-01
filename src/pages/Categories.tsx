import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@api/categories';
import { Helmet } from 'react-helmet';
import Category from '@components/category/Category';
import SubCategoryType from '@components/category/SubCategoryType';
import {ErrorMessage, LoadingSpinner} from "@components/QueryWrapper.tsx";

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

    if (isLoading) return <LoadingSpinner/>;
    if (isError) return <ErrorMessage error={error.message}/>;

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