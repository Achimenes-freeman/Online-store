import { Product } from "../MainPage/types";

export interface FiltersProps {
    products: Product[];
    getFilters: (newFilters: IFilters) => void;
    newProducts: Product[];
}

export type FilterNames = 'Brand' | 'Category' | 'Stock' | 'Price';
export type FilterTypes = string[] | [number, number];

export interface IFilters {
    [key: string]: FilterTypes;
}