import {ISubCategory} from "@interfaces/Category/SubCategory.ts";

export interface ICategory {
    slug: string;
    name: string;
    subcategories: ISubCategory[];
}