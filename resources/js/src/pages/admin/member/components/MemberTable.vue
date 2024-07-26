<script setup lang="ts">
import { GetMemberType, MemberType } from '../actions/getMember';

defineProps<{
    members: GetMemberType;
}>();

const emit = defineEmits<{
    (e: "editMember", member: MemberType): void;
}>();
</script>

<template>
    <table class="table table-bordered table-hover table-striped">
        <thead>
            <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Email</td>
                <td>Edit</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="member in members?.data?.data" :key="member.id">
                <td>{{ member.id }}</td>
                <td>{{ member.name }}</td>
                <td>{{ member.email }}</td>
                <td>
                    <button
                        @click="emit('editMember', member)"
                        class="btn btn-outline-primary"
                    >
                        Edit
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
