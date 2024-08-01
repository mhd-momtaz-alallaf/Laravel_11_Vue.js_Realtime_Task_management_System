import { defineStore } from 'pinia';
import { CreateTaskInput } from '../actions/createTask';

const useTaskStore = defineStore('task', {
    state: () => ({
        taskInput: {
            name: '',
            project_id: 0,
            memberIds: [],
        } as CreateTaskInput,
        edit: false,
        currentTaskId: 0 as number,
    }),
});

export const taskStore = useTaskStore();
