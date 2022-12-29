import { Product } from "../MainPage/types";

export interface FiltersProps {
    products: Product[] | undefined;
    callback?: () => void;
}