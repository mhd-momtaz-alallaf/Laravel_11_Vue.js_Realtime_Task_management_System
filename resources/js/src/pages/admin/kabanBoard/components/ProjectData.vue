<template>
    <div class="row" style="margin-bottom: 20px;">
        <h3 style="color: #767778;">
            Project: {{ ProjectDetail?.data?.name }}
        </h3>
        <span>
            Starting Date: <b>{{ ProjectDetail?.data?.startDate }}</b> - Ending Date: <b>{{ ProjectDetail?.data?.endDate }}</b>
        </span>
    </div>
</template>

<script lang="ts" setup>
import { SingleProjectResponseType } from "../actions/getProjectDetail.types"

defineProps<{
    ProjectDetail: SingleProjectResponseType;
}>();
</script>
