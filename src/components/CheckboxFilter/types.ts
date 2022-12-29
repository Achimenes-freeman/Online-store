import { Product } from "../MainPage/types";

export interface CheckboxFilterProps {
    items: Product[] | undefined;
    prop: keyof Product;
    title: string;
}