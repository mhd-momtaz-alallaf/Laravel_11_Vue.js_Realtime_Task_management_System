<!-- a Progress Bar from Bootstrap Documentation -->
<template>
    <div class="row">
        <div class="col-md-12">
            <div
                class="progress"
                role="progressbar"
                aria-label="Example with label"
                aria-valuenow="5"
                aria-valuemin="0"
                aria-valuemax="100"
            >
                <div
                    class="progress-bar bg-success"
                    :style="{width:parseInt(ProjectDetail?.data?.task_progress?.progress)+'%'}"
                >
                    {{ ProjectDetail?.data?.task_progress?.progress }} %
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { SingleProjectResponseType } from "../actions/getProjectDetail.types"

defineProps<{
    ProjectDetail:SingleProjectResponseType
}>()
</script>
