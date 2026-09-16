export interface PaginatedResponseModel<T> {
    currentPage: number;
    nextPage: number | null;
    previousPage: number | null;
    data: T[];
}