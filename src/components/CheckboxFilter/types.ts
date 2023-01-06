import { FilterNames, FilterTypes } from "../Filters/types";
import { Product } from "../MainPage/types";

export interface CheckboxFilterProps {
    products: Product[];
    newProducts: Product[];
    prop: keyof Product;
    title: FilterNames;
    changeFilters: (filterName: FilterNames, filterValue:FilterTypes) => void;
}

export type ICheckboxFilters = string[]
export type FiltersArr = [string, [number, number]][]