<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::controller(AuthController::class)->group(function(){
    // Register Post route.
    Route::post('/register', 'register');

    // Login Post route.
    Route::post('/login', 'login');
});

Route::controller(ProjectController::class)->group(function(){
    // Storing Project post route.
    Route::post('/projects', 'store');

    // Updating Project put route.
    Route::put('/projects/{project}', 'update');

    // Getting all the projects route.
    Route::get('/projects', 'index');

    // pinning a project on dashboard route.
    Route::post('/projects/{project}/pin-on-dashboard', 'pinProjectOnDashboard');
});

