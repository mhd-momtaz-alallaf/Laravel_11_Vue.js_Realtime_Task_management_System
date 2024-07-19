<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Register Post route.
Route::post('/register', [AuthController::class, 'register']);

// Login Post route.
Route::post('/login', [AuthController::class, 'login']);

// Store Project post route.
Route::post('/projects', [ProjectController::class, 'store']);
