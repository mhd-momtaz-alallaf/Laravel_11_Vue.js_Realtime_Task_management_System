<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

// redirecting to the base url
Route::get('/', function () {
    return redirect('/app/login');
});

// the base url of the vue app
Route::get('/app/{any}', function() {
    return view('welcome');
});

// validating email route.
Route::get('check-email/{token}', [AuthController::class, 'validateEmail']);
