<script setup lang="ts">
import MemberTable from './components/MemberTable.vue';
</script>

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
                        <MemberTable />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
