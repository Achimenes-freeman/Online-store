import { FilterNames } from "../../components/Filters/types";

export interface GenericRangeInputFilter{
    min: number;
    max: number;
    minValue: number;
    maxValue: number;
    title: FilterNames;
    changeFilters: (filterName: FilterNames, filterValue: [number, number]) => void;
}