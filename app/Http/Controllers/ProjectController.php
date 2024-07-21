<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use App\Models\TaskProgress;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    // showing all projects.
    public function index(Request $request)
    {
        $projects = Project::with(['task_progress']);

        return response(['data' => $projects->paginate(10)], 200);
    }

    // Create new project.
    public function store(ProjectRequest $request)
    {
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
}
