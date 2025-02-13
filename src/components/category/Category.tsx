import React from 'react';
import { Link } from 'react-router-dom';
import SubCategory from './SubCategory';
import {ISubCategory} from "@interfaces/Category/SubCategory.ts";

interface CategoryProps {
    slug: string;
    name: string;
    subCategories: ISubCategory[];
}

const Category: React.FC<CategoryProps> = ({ slug, name, subCategories }) => {
    return (
        <div className="card mb-4">
            <h2 className="text-xl font-bold mb-4">{name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {subCategories.map((subCategory: ISubCategory) => (
                    <SubCategory key={subCategory.slug} subCategory={subCategory} />
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