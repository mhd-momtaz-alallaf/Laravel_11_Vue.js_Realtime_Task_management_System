<?php

namespace App\Http\Controllers;

use App\Events\NewProjectCreated;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\ProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Models\Task;
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

        return response()->json(['data' => $projects->paginate(7)], 200);
    }

    // show a project details.
    public function show(Project $project)
    {
        // loading the tasks relation with task_members and each member of the task, and the task_progress relation.
        $project->load(['tasks.task_members.member','task_progress']);

        return new ProjectResource($project);
        // return response()->json(['data' => $project], 200);
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

            // dispatching the NewProjectCreated Event, this will automatically update the projects count with each new project.
            $count = Project::count();
            NewProjectCreated::dispatch($count);

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
        return DB::transaction(function () use ($project) {
            // Unpin all projects from dashboard.
            TaskProgress::where('pinned_on_dashboard', TaskProgress::PINNED_ON_DASHBOARD)->update([
                    'pinned_on_dashboard' => TaskProgress::NOT_PINNED_ON_DASHBOARD,
                ]);

            // pin only one project on dashboard.
            TaskProgress::where('project_id', $project->id)->update([
                'pinned_on_dashboard' => TaskProgress::PINNED_ON_DASHBOARD,
            ]);

            return response()->json([
                'message' => 'Project has pinned on dashboard successfully!'
            ], 200);
        });
    }

    // get the pinned project on dashboard.
    public function getPinnedProject()
    {   // this will get only the id and name of the project that have the 'pinned_on_dashboard' value of the relation 'task_progress' is 1.
        $project = Project::whereHas('task_progress', function ($query) {
            $query->where('pinned_on_dashboard', true);
        })
        ->select('id', 'name', 'slug')
        ->first();

        return response()->json(['data' => $project]);

        // $project = DB::table('task_progress')
        //     ->join('projects', 'task_progress.projectId', '=', 'projects.id')
        //     ->select('projects.id', 'projects.name')
        //     ->where('task_progress.pinned_on_dashbaord', TaskProgress::PINNED_ON_DASHBOARD)
        //     ->first();

        // return response(['data' => $project]);
    }

    // projects count function.
    public function projectsCount()
    {
        return response()->json(['projects_count' => Project::count()]);
    }

    // getting the Count of the not_started, pending and completing tasks of an project to pass it to the charts.
    public function getProjectChartData(Project $project)
    {
        $taskProgress = TaskProgress::where('project_id', $project->id)
            ->value('progress');

        $taskCounts = Task::where('project_id', $project->id)
            ->selectRaw('SUM(status = ?) as not_started, SUM(status = ?) as pending, SUM(status = ?) as completed', [Task::NOT_STARTED, Task::PENDING, Task::COMPLETED])
            ->first();

        $not_started = (int) $taskCounts->not_started ?? 0;
        $pending = (int) $taskCounts->pending ?? 0;
        $completed = (int) $taskCounts->completed ?? 0;

        return response([
            'tasks' => [$not_started, $pending, $completed],
            'progress' => (int) $taskProgress
        ]);
    }
}
