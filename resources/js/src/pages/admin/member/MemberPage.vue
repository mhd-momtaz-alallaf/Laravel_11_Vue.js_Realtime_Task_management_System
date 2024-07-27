<template>
    <div class="container">
        <div class="row">
            <div class="col-md-10">
                <div class="card">
                    <div class="card-header">
                        Members
                        <router-link style="float:right" to="/create-members" class="btn btn-primary">Create Member</router-link>
                    </div>
                    <div class="card-body">
                        <MemberTable
                            @edit-member="editMember"
                            :loading="loading"
                            @getMember="getMembers"
                            :members="memberData"
                        >
                            <!-- Passing the pagination data as a slot -->
                            <template #pagination>
                                <Bootstrap5Pagination
                                    v-if="memberData?.data"
                                    :data="memberData?.data"
                                    @pagination-change-page="getMembers"
                                />
                            </template>
                        </MemberTable>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { memberType, useGetMembers } from "./actions/getMember";
import MemberTable from './components/MemberTable.vue';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import { useRouter } from "vue-router";
import { memberStore } from "./store/memberStore";
import { MemberInputType } from "./actions/createMember";

const { getMembers, loading, memberData } = useGetMembers();

const router = useRouter();
function editMember(member: memberType) {
    memberStore.memberInput = {
        id: member.id,
        name: member.name,
        email: member.email,
    };
    memberStore.edit = true;
    router.push('/create-members');
}

onMounted(async () => {
    await getMembers();
    memberStore.edit = false;
    memberStore.memberInput = {
        name: '',
        email: '',
    } as MemberInputType
});
</script>
