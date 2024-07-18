<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// validating email route.
Route::get('check-email/{token}', [AuthController::class, 'validateEmail']);
