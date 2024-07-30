import { ref } from "vue";
import { memberType } from "../../member/actions/getMember";
import { showError } from "../../../../helpers/toast-notification";
import { taskStore } from "../store/kabanStore";

export function useSelectMember() {
    const selectedMembers = ref<Array<memberType>>([]);

    function selectMember(member: memberType) {
        const memberExist = selectedMembers.value.filter(memberItem => memberItem.id === member.id);

        if (memberExist.length === 0) {
            selectedMembers.value.push({
                id: member.id,
                name: member.name,
                email: member.email,
            });

            // adding the selected member id to the memberIds array.
            taskStore.taskInput.memberIds.push(member.id);
        } else {
            showError('You have already selected this member!');
        }
    }

    function unSelectMember(memberId: number) {
        // unselect a member.
        const filteredMembers = selectedMembers.value.filter(memberItem => memberItem.id !== memberId);
        selectedMembers.value = filteredMembers;

        // remove the unselected member from the memberIds array.
        const filteredMemberIds = taskStore.taskInput.memberIds.filter(item => item !== memberId);
        taskStore.taskInput.memberIds = filteredMemberIds;
    }

    function clearAllSelectedMembers() {
        // Clear all selected members.
        selectedMembers.value = [];
        taskStore.taskInput.memberIds = [];
        console.log(selectedMembers.value);
    }

    return { selectedMembers, selectMember, unSelectMember, clearAllSelectedMembers };
}
