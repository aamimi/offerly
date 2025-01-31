import React from 'react';
import { Link } from 'react-router-dom';
import SubCategoryType from "./SubCategoryType";

interface SubCategoryProps {
    subCategory: SubCategoryType;
}

const SubCategory: React.FC<SubCategoryProps> = ({ subCategory }) => {
    return (
        <Link
            to={`/products?categories[]=${subCategory.slug}`}
            key={subCategory.id}>
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