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
                        :members="memberData"
                        :loading="loading"
                        @getMember="getMembers"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { MemberType, useGetMembers } from "./actions/getMember";
import MemberTable from './components/MemberTable.vue';

const { getMembers, loading, memberData } = useGetMembers();
async function showListOfMembers() {
    await getMembers();
}

onMounted(async () => {
    showListOfMembers();
});
</script>
