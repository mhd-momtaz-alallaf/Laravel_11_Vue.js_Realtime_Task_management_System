<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use App\Models\TaskProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    // showing all projects.
    public function index(Request $request)
    {
        // getting the search parameter that passed with the route.
        $query = $request->get('search');

        $projects = Project::with('task_progress');

        // getting only the projects having the same name of the search parameter (if the query exist).
        if ($query) {
            $projects->where('name', 'like', "%{$query}%");
        }

        $projects->orderBy('id', 'desc');

        return response()->json(['data' => $projects->paginate(10)], 200);
    }

    // show a project details.
    public function show(Project $project)
    {
        // loading the tasks relation with task_members and each member of the task.
        $project->load(['tasks.task_members.member']);

        return response()->json(['data' => $project], 200);
    }

    // Create new project.
    public function store(ProjectRequest $request)
    {
        // wrapping the creation statements with a transaction.
        return DB::transaction(function() use ($request){
            $validated = $request->validated();

            // storing the project in the database.
            $project = Project::create([
                'name' => $validated['name'],
                'startDate' => $validated['startDate'],
                'endDate' => $validated['endDate'],
                'status' => Project::NOT_STARTED,
                'slug' => Project::generateSlug($validated['name']),
            ]);

            // adding the initial project progress value (associating the Project Model with the TaskProgress Model).
            TaskProgress::create([
                'project_id' => $project->id,
                'pinned_on_dashboard' => TaskProgress::NOT_PINNED_ON_DASHBOARD,
                'progress' => TaskProgress::INITIAL_PROJECT_PROGRESS_PERCENT,
            ]);

            return response([
                'message' => 'Project created successfully!',
            ], 200);
        });
    }

    // update a project.
    public function update(ProjectRequest $request, Project $project)
    {
        $validated = $request->validated();

        $project->update([
            'name' => $validated['name'],
            'startDate' => $validated['startDate'],
            'endDate' => $validated['endDate'],
            'slug' => Project::generateSlug($validated['name']),
        ]);

        return response([
            'message' => 'Project updated successfully!',
        ], 200);
    }

    // pinning a project on the dashboard.
    public function pinProjectOnDashboard(Project $project)
    {
        TaskProgress::where('project_id', $project->id)->update([
            'pinned_on_dashboard' => TaskProgress::PINNED_ON_DASHBOARD,
        ]);

        return response()->json(['message' => 'Project has pinned on dashboard successfully!'], 200);
    }
}
