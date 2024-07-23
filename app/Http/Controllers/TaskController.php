<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Models\Task;
use App\Models\TaskMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    public function store(TaskRequest $request)
    {
        $validated = $request->validated();

        return DB::transaction(function() use ($validated) {
            // creating a new task.
            $task = Task::create([
                'project_id' => $validated['projectId'],
                'name' => $validated['name'],
                'status' => Task::NOT_STARTED,
            ]);

            // creating $taskMembers array of objects, and assigning each element of memberIds array with its TaskMember object.
            $taskMembers = array_map(fn($memberId) => [
                'project_id' => $validated['projectId'],
                'task_id' => $task->id,
                'member_id' => $memberId,
            ], $validated['memberIds']);

            // creating Many TaskMember ($taskMembers collection), using the members() relation in the Task Model.
            $task->members()->createMany($taskMembers);

            return response()->json(['message' => 'Task created successfully!']);
        });
    }
}
