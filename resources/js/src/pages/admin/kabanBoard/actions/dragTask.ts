import { makeHttpRequest } from "../../../../helpers/makeHttpRequest";
import { successMsg } from "../../../../helpers/toast-notification";
import {  showErrorResponse } from "../../../../helpers/util";
import { taskStore } from "../store/kabanStore";

export function useDragTask(fn:(slug:string) => Promise<void>, slug: string) { // fn is to get the project data by project slug (will bw passed from KabanBoard.vue).
    async function fromNotStartedToPending(taskId: number, project_id: number) {
        const notStartedTask = document.querySelector(".notStartedTask_" + taskId) as HTMLElement;

        const pendingColumn = document.querySelector(".pending_task") as HTMLElement;

        let isDragged = false;

        pendingColumn.addEventListener("dragstart", function () {
            console.log("dragstart");
        });

        // this event will be triggered when dragging a task to another status, drag over event : this event fire many actions
        pendingColumn.addEventListener("dragover", function (event) {
            if (!isDragged) {
                console.log("dragover");
                event.preventDefault();
                pendingColumn.className += " hovered";
                isDragged = true;
            }
        });

        pendingColumn.addEventListener("dragleave", function () {
            console.log("dragleave");
            isDragged = false;
            pendingColumn.classList.remove("hovered");
        });

        // attention drop events fire many requests within the server
        pendingColumn.addEventListener("drop", async function (event) {
            console.log("drop");
            event.preventDefault();
            pendingColumn.append(notStartedTask);
            pendingColumn.classList.remove("hovered");
            isDragged = false;

            taskStore.currentTaskId = taskId;
            // console.log('drop event') is sending many request to the server, so we will send only one http request by this check.
            if (!pendingColumn.getAttribute("data-listeners-added")) {
                pendingColumn.setAttribute("data-listeners-added", "true");

                setTimeout(async() => {
                    await Promise.all([
                        changeTaskStatus(taskStore.currentTaskId, project_id, 'tasks/change-status-to-pending'),
                        fn(slug),
                    ]);

                    pendingColumn.removeAttribute("data-listeners-added");
                }, 200);
            }
        });
    }

    async function fromPendingToCompleted(taskId: number, project_id: number) {
        const pendingTask = document.querySelector(".pendingTask_" + taskId) as HTMLElement;
        const completedColumn = document.querySelector(".completed_task") as HTMLElement;
        let isDragged = false;

        completedColumn.addEventListener("dragstart", function () {
            console.log("dragstart");
        });

        //drag over event : this event fire many actions
        completedColumn.addEventListener("dragover", function (event) {
            if (!isDragged) {
                event.preventDefault();
                completedColumn.className += " hovered";
                isDragged = true;
            }
        });

        completedColumn.addEventListener("dragleave", function () {
            console.log("dragstart");
            isDragged = false;
            completedColumn.classList.remove("hovered");
        });

        completedColumn.addEventListener("drop", function (event) {
            event.preventDefault();
            completedColumn.append(pendingTask);
            completedColumn.classList.remove("hovered");
            isDragged = false;
        });
    }

    async function fromCompletedToPending(taskId: number, project_id: number) {
        const completedTask = document.querySelector(".completedTask_" + taskId) as HTMLElement;
        const pendingColumn = document.querySelector(".pending_task") as HTMLElement;
        let isDragged = false;

        pendingColumn.addEventListener("dragstart", function () {
            console.log("dragstart");
        });

        //drag over event : this event fire many actions
        pendingColumn.addEventListener("dragover", function (event) {
            if (!isDragged) {
                event.preventDefault();
                pendingColumn.className += " hovered";
                isDragged = true;
            }
        });

        pendingColumn.addEventListener("dragleave", function () {
            console.log("dragstart");
            isDragged = false;
            pendingColumn.classList.remove("hovered");
        });

        pendingColumn.addEventListener("drop", function (event) {
            event.preventDefault();
            pendingColumn.append(completedTask);
            pendingColumn.classList.remove("hovered");
            isDragged = false;
        });
    }

    async function fromPendingToNotStarted(taskId: number, project_id: number) {
        const pendingTask = document.querySelector(".pendingTask_" + taskId) as HTMLElement;
        const notStartedColumn = document.querySelector(".not_started_task") as HTMLElement;
        let isDragged = false;

        notStartedColumn.addEventListener("dragstart", function () {
            console.log("dragstart");
        });

        //drag over event : this event fire many actions
        notStartedColumn.addEventListener("dragover", function (event) {
            if (!isDragged) {
                event.preventDefault();
                notStartedColumn.className += " hovered";
                isDragged = true;
            }
        });

        notStartedColumn.addEventListener("dragleave", function () {
            console.log("dragstart");
            isDragged = false;
            notStartedColumn.classList.remove("hovered");
        });

        notStartedColumn.addEventListener("drop", function (event) {
            event.preventDefault();
            notStartedColumn.append(pendingTask);
            notStartedColumn.classList.remove("hovered");
            isDragged = false;


        });
    }

    return {
        fromNotStartedToPending,
        fromPendingToCompleted,
        fromCompletedToPending,
        fromPendingToNotStarted
    }
}

export type changeTaskInput = {
    taskId: number;
    project_id: number;
}

export async function changeTaskStatus(taskId: number, project_id: number, endPoint: string) {
    try {
        const data = await makeHttpRequest<changeTaskInput, { message: string }>(
            endPoint,
            "PUT",
            { taskId: taskId, project_id: project_id }
        );
        successMsg(data.message);
    } catch (error) {
        showErrorResponse(error);
    }
}
