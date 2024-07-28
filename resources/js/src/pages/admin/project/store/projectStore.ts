import { defineStore } from 'pinia';
import { ProjectInputType } from '../actions/createProject';

const useProjectStore = defineStore('project', {
    state: () => ({
        projectInput: {
            id: 0,
            name: '',
            startDate: '',
            endDate: '',
        } as ProjectInputType,
        edit: false,
    }),
});

export const projectStore = useProjectStore();
