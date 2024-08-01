<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Http\Requests\TaskStatusRequest;
use App\Models\Task;
use App\Models\TaskMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    // store a new task.
    public function store(TaskRequest $request)
    {
        $validated = $request->validated();

        return DB::transaction(function() use ($validated) {
            // creating a new task.
            $task = Task::create([
                'project_id' => $validated['project_id'],
                'name' => $validated['name'],
                'status' => Task::NOT_STARTED,
            ]);

            // creating $taskMembers array of objects, and assigning each element of memberIds array with its TaskMember object.
            $taskMembers = array_map(fn($memberId) => [
                'project_id' => $validated['project_id'],
                'task_id' => $task->id,
                'member_id' => $memberId,
            ], $validated['memberIds']);

            // creating Many TaskMember ($taskMembers collection), using the task_members() relation in the Task Model.
            $task->task_members()->createMany($taskMembers);

            return response()->json(['message' => 'Task created successfully!']);
        });
    }

    // Updating the task status to PENDING.
    public function updateTaskStatusToPending(TaskStatusRequest $request)
    {
        Task::changeTaskStatus($request->validated()['taskId'], Task::PENDING);
        Task::handleProjectProgress($request->validated()['project_id']);

        return response()->json(['message' => 'Task Moved to pending'], 200);
    }

    // Updating the task status to COMPLETED.
    public function updateTaskStatusToCompleted(TaskStatusRequest $request)
    {
        Task::changeTaskStatus($request->validated()['taskId'], Task::COMPLETED);
        Task::handleProjectProgress($request->validated()['project_id']);

        return response()->json(['message' => 'Task Moved to completed'], 200);
    }

    // Updating the task status to NOT_STARTED.
    public function updateTaskStatusToNotStarted(TaskStatusRequest $request)
    {
        Task::changeTaskStatus($request->validated()['taskId'], Task::NOT_STARTED);
        Task::handleProjectProgress($request->validated()['project_id']);

        return response()->json(['message' => 'Task Moved to not started'], 200);
    }
}
