<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    // Create new project.
    public function store(ProjectRequest $request)
    {
        $validated = $request->validated();

        $project = Project::create([
            'name' => $validated['name'],
            'startDate' => $validated['startDate'],
            'endDate' => $validated['endDate'],
            'status' => Project::NOT_STARTED,
            'slug' => Project::generateSlug($validated['name']),
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
