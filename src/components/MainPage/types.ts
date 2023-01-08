export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
};

export interface FiltersType {
    'Brand'?: string[];
    'Category'?: string[];
    'Stock'?: [number, number];
    'Price'?: [number, number];
}

export interface CardSizes {
    bigCards: boolean;
    smallCards: boolean;
}

export interface LinkOfFilters {
    linkFilters:FiltersType;
    linkSearch: string;
    linkSort: string
    linkCardSize: string;
}
