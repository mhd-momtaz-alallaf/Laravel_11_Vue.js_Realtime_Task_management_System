<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::controller(AuthController::class)->group(function() {
    // Register Post route.
    Route::post('/register', 'register');

    // Login Post route.
    Route::post('/login', 'login');
});

Route::middleware('auth:sanctum')->group(function() {
    Route::controller(ProjectController::class)->group(function() {
        // Storing Project post route.
        Route::post('/projects', 'store');

        // projects count endpoint.
        Route::get('/projects/count', 'projectsCount');

        // Updating Project put route.
        Route::put('/projects/{project}', 'update')
            ->where('project', '[0-9]+');

        // Getting all the projects route.
        Route::get('/projects', 'index');

        // Show a project details route.
        Route::get('/projects/{project:slug}', 'show');

        // Pinning a project on dashboard route.
        Route::post('/projects/{project}/pin-on-dashboard', 'pinProjectOnDashboard')
            ->where('project', '[0-9]+');
    });

    Route::controller(MemberController::class)->group(function() {
        // Getting all the members.
        Route::get('/members', 'index');

        // storing a new member.
        Route::post('/members', 'store');

        // Updating a member.
        Route::put('/members/{member}', 'update')
            ->where('member', '[a-zA-Z0-9]+');
    });

    Route::controller(TaskController::class)->group(function() {
        // storing a new task.
        Route::post('/tasks', 'store');

        // updating the task status to pending endpoint.
        Route::put('/tasks/change-status-to-pending', 'updateTaskStatusToPending');

        // updating the task status to completed endpoint.
        Route::put('/tasks/change-status-to-completed', 'updateTaskStatusToCompleted');

        // updating the task status to not started endpoint.
        Route::put('/tasks/change-status-to-not-started', 'updateTaskStatusToNotStarted');
    });
});
