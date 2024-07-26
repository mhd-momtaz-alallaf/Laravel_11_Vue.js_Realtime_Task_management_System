import { ref } from "vue";
import { makeHttpRequest } from "../../../../helpers/makeHttpRequest";
import { showErrorResponse } from "../../../../helpers/util";

export type memberType = {
    id: number;
    name: string;
    email: string;
}

export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type PaginationData = {
    current_page: number;
    last_page: number;
    links: PaginationLink[];
    per_page?: number;
    total?: number;
};

export type getMemberType = {
    data: {
        data: memberType[];
        current_page: number;
        last_page: number;
        links: PaginationLink[];
        per_page?: number;
        total?: number;
    };
} & Record<string, any>;

export function useGetMembers() {
    const loading = ref(false);
    const memberData = ref<getMemberType>({} as getMemberType);

    async function getMembers(page: number = 1, query: string = '') {
        try {
            loading.value = true;
            const data = await makeHttpRequest<undefined, getMemberType>(
                `members?search=${query}&page=${page}`,
                'GET'
            );

            loading.value = false;
            memberData.value = data;
        } catch (error: any) {
            loading.value = false;
            showErrorResponse(error);
        }
    }

    return { getMembers, memberData, loading };
}
