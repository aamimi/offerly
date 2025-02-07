import {fetchCategoriesBySlug} from "@api/categories";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {ErrorMessage, LoadingSpinner} from "@components/QueryWrapper";
import SubCategoryType from "@components/category/SubCategoryType";
import SubCategory from "@components/category/SubCategory";
import {Helmet} from "react-helmet";

interface ICategory {
    slug: string;
    name: string;
    meta_title: string;
    meta_description: string | null | undefined;
    subcategories: SubCategoryType[];
}

const CategoryDetails = () => {
    const {slug} = useParams<{ slug: string }>();
    const {data: response, isLoading, isError, error} = useQuery({
        queryKey: ['category', slug],
        queryFn: () => fetchCategoriesBySlug(slug ?? ''),
    });

    const category: ICategory = response?.data;

    if (isLoading) return <LoadingSpinner/>;
    if (isError) return <ErrorMessage error={error.message}/>;

    return (
        <>
            <Helmet>
                <title>Categories - {category.meta_title}</title>
                <meta name="description" content={category.meta_description ?? ''}/>
            </Helmet>
            <div className="container mx-auto">
                <div className="card">
                    <h1 className="mb-4">{category.name}</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {category.subcategories.map((subCategory: SubCategoryType) => (
                            <SubCategory key={subCategory.id} subCategory={subCategory}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryDetails;