import { Product } from "../MainPage/types";

export interface CheckboxFilterProps {
    items: Product[];
    prop: keyof Product;
    title: string;
}