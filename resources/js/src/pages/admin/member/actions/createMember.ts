import { ref } from "vue";
import { makeHttpRequest } from "../../../../helpers/makeHttpRequest";
import { successMsg } from "../../../../helpers/toast-notification";
import { showErrorResponse } from "../../../../helpers/util";

export type MemberInputType = {
    name: string;
    email: string;
}

export type MemberResponseType = {
    message: string;
}

export const memberInput = ref<MemberInputType>({
    name: '',
    email: '',
});

export function useCreateOrUpdateMember(){
    const loading = ref(false)
    async function createOrUpdate(){
       try {
            loading.value = true;
            const data = await createMember();

            loading.value = false;
            memberInput.value = { name: '', email: '' };
            successMsg(data.message);
        } catch (error: any) {
            loading.value = false;
            showErrorResponse(error);
        }
    }

    return {createOrUpdate, loading};
}

async function createMember(){
    const data = await makeHttpRequest<MemberInputType, MemberResponseType>(
        'members',
        'POST',
        memberInput.value
    );

    return data;
}
