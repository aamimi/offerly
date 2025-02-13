import React from 'react';
import { Link } from 'react-router-dom';
import {ISubCategory} from "@interfaces/Category/SubCategory.ts";

interface SubCategoryProps {
    subCategory: ISubCategory;
}

const SubCategory: React.FC<SubCategoryProps> = ({ subCategory }) => {
    return (
        <Link
            to={`/group/${subCategory.slug}`}
            key={subCategory.slug}>
            <div className="action-card flex flex-row items-center gap-3 p-2">
                <img
                    src={subCategory.image}
                    alt={subCategory.name}
                    className="rounded-sm w-20 h-20"/>
                <h3>{subCategory.name}</h3>
            </div>
        </Link>
    );
};

export default SubCategory;