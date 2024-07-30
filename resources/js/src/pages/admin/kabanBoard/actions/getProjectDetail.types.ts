export enum TaskStatus {
    NOT_STARTED = 0,
    PENDING = 1,
    COMPLETED = 2,
};

export type SingleProjectResponseType = {
    data: {
        id: number;
        name: string;
        status: number;
        startDate: string;
        endDate: string;
        slug: string;
        created_at: string;
        updated_at: string;
        tasks: [
            {
                id: number;
                project_id: number;
                name: string;
                status: number;
                created_at: string;
                updated_at: string;
                task_members: [
                    {
                        id: number;
                        project_id: number;
                        task_id: number;
                        member_id: number;
                        created_at: string;
                        updated_at: string;
                        members: {
                            id: number;
                            name: string;
                            email: string;
                            created_at: string;
                            updated_at: string;
                        };
                    },
                ];
            },
        ];
        task_progress: {
            id: number;
            project_id: number;
            progress: string;
            pinned_on_dashboard: number;
            created_at: string;
            updated_at: string;
        };
    };
};
