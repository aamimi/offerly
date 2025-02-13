import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@api/categories';
import { Helmet } from 'react-helmet';
import Category from '@components/category/Category';
import {ErrorMessage, LoadingSpinner} from "@components/QueryWrapper.tsx";
import {ICategory} from '@interfaces/Category/CategoryDetails';

const Categories = () => {
    const { data: response, isLoading, isError, error } = useQuery({
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
                {response?.data.map((category: ICategory) => (
                    <Category
                        key={category.slug}
                        slug={category.slug}
                        name={category.name}
                        subCategories={category.subcategories}
                    />
                ))}
            </div>
        </>
    );
};

export default Categories;