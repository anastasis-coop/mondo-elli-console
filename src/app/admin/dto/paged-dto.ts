export interface PagedDto<T> {
    content: T[];
    numberOfElements: number;
    totalPages: number;
    totalElements: number;
}