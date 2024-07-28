<script lang="ts" setup>
import { onMounted } from "vue";
import { ProjectType, useGetProject } from "./actions/getProject";
import ProjectTable from "./components/ProjectTable.vue";
import { useRouter } from "vue-router";
import { projectStore } from ".//store/projectStore";
import { ProjectInputType } from ".//actions/createProject";

const { getProjects, loading, ProjectData } = useGetProject();
const router = useRouter();

function editProject(project: ProjectType){
    projectStore.projectInput = {
        id: project.id,
        name: project.name,
        startDate: project.startDate,
        endDate: project.endDate,
    };

    projectStore.edit=true
    router.push('/create-projects')
};

onMounted(async () => {
    await getProjects();
    projectStore.edit = false;
    projectStore.projectInput = {
        name: '',
        startDate: '',
        endDate: '',
    } as ProjectInputType;
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
                            @editProject="editProject"
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
