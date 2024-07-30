<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { onMounted, ref } from "vue";
import { getMemberType, useGetMembers } from "../../../member/actions/getMember";
import { showError } from "../../../../../helpers/toast-notification";
import { myDebounce } from "../../../../../helpers/util";
import { taskStore } from "../../store/kabanStore";
import { useSelectMember } from "../../actions/selectMember";
import { useCreateTask } from "../../actions/createTask";

const { getMembers, memberData } = useGetMembers();
const { selectMember, unSelectMember, clearAllSelectedMembers, selectedMembers } = useSelectMember();

const emit = defineEmits<{
    (e: "closeModal"): void;
}>();

const rules = {
    name: { required }, // Matches state.lastName
};

const v$ = useVuelidate(rules, taskStore.taskInput);
const query = ref("");
const { loading, createTask } = useCreateTask();

async function submitTask() {
    const result = await v$.value.$validate();

    if (!result) return;

    if (taskStore.taskInput.memberIds.length > 0) {
        await createTask();
        taskStore.taskInput.memberIds = [];
        taskStore.taskInput.name = "";
        clearAllSelectedMembers();
        v$.value.$reset();
    } else{
        showError('Please select a member first!');
    }
};

const searchMember = myDebounce(async function() {
    getMembers(1, query.value);
}, 300);

onMounted(async () => {
    await getMembers();
});
</script>

<template>
    <!-- Modal -->
    <div
        class="modal fade"
        id="taskModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <!-- -->
                <form @submit.prevent="submitTask" enctype="multipart/form-data">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                            Add Task
                        </h1>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            @click="emit('closeModal')"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <div class="select-members">
                            <span
                                v-for="member in selectedMembers"
                                @click="unSelectMember(member.id)"
                                :key="member.id"
                            >
                                {{ member.name }} <b>x</b>
                            </span>
                        </div>

                        <div class="row">
                            <div class="row">
                                <!-- {{ taskStore.taskInput }} -->
                                <div class="col-md-9">
                                    <Error :errors="v$.name.$errors">
                                        <BaseInput
                                            placeholder="Task name"
                                            v-model="taskStore.taskInput.name"
                                        />
                                    </Error>
                                </div>

                                <div class="col-md-3">
                                    <BaseBtn
                                        :loading="loading"
                                        label="Add Task"
                                    />
                                </div>
                            </div>
                            <br />
                            <br />
                            <br />

                            <div class="form-group">
                                <BaseInput
                                    type="text"
                                    v-model="query"
                                    @keydown="searchMember"
                                    placeholder="Search a member..."
                                />
                            </div>

                            <br />
                            <br />
                        </div>
                        <br />
                        <table class="table table-hover table-sm">
                            <thead style="font-weight: bold">
                                <tr>
                                    <td>ID</td>
                                    <td>Name</td>
                                    <td>Select</td>
                                </tr>
                            </thead>
                            <tr
                                v-for="member in memberData?.data?.data"
                                :key="member.id"
                            >
                                <td># {{ member.id }}</td>
                                <td>{{ member.name }}</td>
                                <td>
                                    <button
                                        @click="selectMember(member)"
                                        type="button"
                                        class="btn btn-light"
                                        style="
                                            border-radius: 10px;
                                            background-color: aliceblue;
                                        "
                                    >
                                        <b>+</b> Add
                                    </button>
                                </td>
                            </tr>
                        </table>
                        <!-- Adding Pagination to the member table -->
                        <Bootstrap5Pagination
                            v-if="memberData?.data"
                            :data="memberData?.data"
                            @pagination-change-page="getMembers"
                        />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.select-members span {
    padding: 5px;
    border-radius: 4px;
    border: 1px solid gray;
    cursor: pointer;
    margin: 2px;
}
.select-members span b {
    color: red;
}
</style>
