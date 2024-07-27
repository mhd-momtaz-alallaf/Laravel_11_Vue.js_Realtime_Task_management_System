import { ref } from "vue";
import { makeHttpRequest } from "../../../../helpers/makeHttpRequest";
import { successMsg } from "../../../../helpers/toast-notification";
import { showErrorResponse } from "../../../../helpers/util";
import { memberStore } from "../store/memberStore";

export type MemberInputType = {
    id?: number;
    name: string;
    email: string;
}

export type MemberResponseType = {
    message: string;
}

export function useCreateOrUpdateMember() {
    const loading = ref(false)
    async function createOrUpdate(){
       try {
            loading.value = true;
            const data = memberStore.edit ? await updateMember() : await createMember();

            loading.value = false;
            memberStore.memberInput = { name: '', email: '' };
            successMsg(data.message);
        } catch (error: any) {
            loading.value = false;
            showErrorResponse(error);
        }
    }

    return {createOrUpdate, loading};
}

async function createMember() {
    const data = await makeHttpRequest<MemberInputType, MemberResponseType>(
        'members',
        'POST',
        memberStore.memberInput
    );

    return data;
}

async function updateMember() {
    const data= await makeHttpRequest<MemberInputType, MemberResponseType>(
        `members/${memberStore.memberInput.id}`,
        'PUT',
        memberStore.memberInput
    );

    memberStore.edit = false;
    return data;
}
