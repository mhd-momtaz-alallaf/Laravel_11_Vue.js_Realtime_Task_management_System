<?php

namespace App\Http\Controllers;

use App\Events\NewUserCreated;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $user_fields = $request->all();

        $errors = Validator::make($user_fields, [
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|max:8',
        ]);

        if($errors->fails()){
            return response($errors->errors()->all(), 422);
        }

        $user = User::create([
            'email' => $user_fields['email'],
            'password' => bcrypt($user_fields['password']),
            'isValidEmail' => User::IS_INVALID_EMAIL,
            'remember_token' => $this->generateRandomString(),
        ]);

        // sending an email immediately to the user after creating a user event.
        NewUserCreated::dispatch($user);

        return response([
            'message' => 'User Created Successfully!',
            'user' => $user,
        ], 200);
    }

    // generating a random string for use it as the user remember token.
    function generateRandomString()
    {
        return Str::random(10) . time();
    }
}
