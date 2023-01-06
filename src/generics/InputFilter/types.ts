export interface GenericInputFilter {
    text: string;
    count?: number;
    totalCount: number;
    callback?: (value: string) => void;
    isReset?: boolean;
    setResetFalse: () => void;
}