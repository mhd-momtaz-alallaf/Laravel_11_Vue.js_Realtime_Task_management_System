// // this is a declaration file for laravel-vue-pagination to able to import it in the app.ts file
declare module 'laravel-vue-pagination' {
    import { DefineComponent } from 'vue';

    // Define the structure of pagination data based on the API response
    interface PaginationLink {
        url: string | null;
        label: string;
        active: boolean;
    }

    interface PaginationData {
        current_page: number;
        last_page: number;
        links: PaginationLink[];
        per_page?: number;
        total?: number;
    }

    // Define the props and events for the Bootstrap5Pagination component
    export const Bootstrap5Pagination: DefineComponent<{
        data: PaginationData;
    }, {}, {
        'pagination-change-page': (page: number) => void;
    }>;
}
