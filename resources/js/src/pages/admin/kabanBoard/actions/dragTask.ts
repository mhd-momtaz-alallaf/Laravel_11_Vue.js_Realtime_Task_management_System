import { makeHttpRequest } from "../../../../helpers/makeHttpRequest";
import { successMsg } from "../../../../helpers/toast-notification";
import {  showErrorResponse } from "../../../../helpers/util";
import { taskStore } from "../store/kabanStore";

export function useDragTask() {
    async function fromNotStartedToPending(taskId: number, projectId: number) {
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

        // attention drop events fire many actions within console
        pendingColumn.addEventListener("drop", async function (event) {
            console.log("drop");
            event.preventDefault();
            pendingColumn.append(notStartedTask);
            pendingColumn.classList.remove("hovered");
            isDragged = false;
        });
    }

    async function fromPendingToCompleted(taskId: number, projectId: number) {
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

    function fromCompletedToPending(taskId: number,projectId:number) {
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

    async function fromPendingToNotStarted(taskId: number, projectId: number) {
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
    };
}
