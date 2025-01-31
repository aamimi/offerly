import React from 'react';
import { Link } from 'react-router-dom';
import SubCategory from './SubCategory';
import SubCategoryType from "./SubCategoryType";

interface CategoryProps {
    id: string;
    name: string;
    slug: string;
    subCategories: SubCategoryType[];
}

const Category: React.FC<CategoryProps> = ({ id, name, slug, subCategories }) => {
    return (
        <div key={id} className="card mb-4">
            <h2 className="text-xl font-bold mb-4">{name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {subCategories.map((subCategory: SubCategoryType) => (
                    <SubCategory key={subCategory.id} subCategory={subCategory} />
                ))}
                <Link
                    to={`/categories/${slug}`}
                    className="action-card flex flex-row items-center justify-center p-2">
                    <h3>View All</h3>
                </Link>
            </div>
        </div>
    );
};

export default Category;