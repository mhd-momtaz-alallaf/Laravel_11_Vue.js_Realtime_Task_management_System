<script lang="ts" setup>
import { onMounted } from "vue";
import { useGetProject } from "./actions/getProject";
import ProjectTable from "./components/ProjectTable.vue";

const { getProjects, loading, ProjectData } = useGetProject();

onMounted(async () => {
    await getProjects();
});
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        Projects
                        <RouterLink style="float:right" to="/create-projects" class="btn btn-primary">
                            Create Project
                        </RouterLink>
                    </div>

                    <div class="card-body">
                        <ProjectTable
                            @getProject="getProjects"
                            :loading="loading"
                            :projects="ProjectData"
                        >
                            <template #pagination>
                                <Bootstrap5Pagination
                                    v-if="ProjectData?.data"
                                    :data="ProjectData?.data"
                                    @pagination-change-page="getProjects"
                                />
                            </template>
                        </ProjectTable>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
