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
import { useGetMembers } from "./actions/getMember";
import MemberTable from './components/MemberTable.vue';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';

const { getMembers, loading, memberData } = useGetMembers();

onMounted(async () => {
    await getMembers();
});
</script>
