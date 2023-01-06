import { FilterNames, FilterTypes } from "../Filters/types";
import { Product } from "../MainPage/types";

export interface RangeFilterProps {
    products: Product[];
    type: 'price' | 'stock';
    changeFilters: (filterName: FilterNames, filterValue:FilterTypes) => void;
    newProducts: Product[];
}
