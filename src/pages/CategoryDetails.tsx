import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {Helmet} from "react-helmet";
import {fetchCategoriesBySlug} from "@api/categories";
import {ErrorMessage, LoadingSpinner} from "@components/QueryWrapper";
import SubCategory from "@components/category/SubCategory";
import {IMetatags} from '@interfaces/Metatags';
import {ICategory} from '@interfaces/Category/CategoryDetails';
import {ISubCategory} from "@interfaces/Category/SubCategory.ts";

const CategoryDetails = () => {
    const {slug} = useParams<{ slug: string }>();
    const {data: response, isLoading, isError, error} = useQuery({
        queryKey: ['category', slug],
        queryFn: () => fetchCategoriesBySlug(slug ?? ''),
    });

    const category: ICategory = response?.data;
    const metaTags: IMetatags = response?.meta;

    if (isLoading) return <LoadingSpinner/>;
    if (isError) return <ErrorMessage error={error.message}/>;

    return (
        <>
            <Helmet>
                <title>Categories - {metaTags.title}</title>
                <meta name="description" content={metaTags.description ?? ''}/>
            </Helmet>
            <div className="container mx-auto">
                <div className="card">
                    <h1 className="mb-4">{category.name}</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {category.subcategories.map((subCategory: ISubCategory) => (
                            <SubCategory key={subCategory.slug} subCategory={subCategory}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryDetails;