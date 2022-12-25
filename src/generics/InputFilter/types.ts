export interface GenericInputFilter {
    text: string;
    count?: number;
    totalCount: number;
    callback?: () => void;
}