<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\ProjectStoreRequest;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function store(ProjectStoreRequest $request)
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
}
