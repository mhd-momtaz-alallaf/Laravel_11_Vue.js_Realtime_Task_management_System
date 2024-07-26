import { ref } from "vue"
import { makeHttpRequest } from "../../../../helpers/makeHttpRequest"
import { showErrorResponse } from "../../../../helpers/util"

export type MemberType={
    id: number;
    name: string;
    email: string;
}

export type GetMemberType = {
    data: {data: Array<MemberType>}
} & Record<string, any>

export function useGetMembers() {
    const loading = ref(false);
    const memberData = ref<GetMemberType>({} as GetMemberType);
    async function getMembers(){
       try {
            loading.value = true;
            const data= await makeHttpRequest<undefined,GetMemberType>(
                'members',
                'GET',
            );

            loading.value = false;
            memberData.value = data;
        } catch (error: any) {
            loading.value = false;
            showErrorResponse(error);
        }
    }

    return {getMembers ,memberData ,loading};
}
