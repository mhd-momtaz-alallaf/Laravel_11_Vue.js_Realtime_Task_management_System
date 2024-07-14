<?php

namespace App\Http\Controllers;

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
            'email' => 'required',
            'password' => 'required|min:6|max:8',
        ]);

        if($errors->fails()){
            return response($errors->errors()->all(), 422);
        }

        User::create([
            'email' => $user_fields['email'],
            'password' => bcrypt($user_fields['password']),
            'isValidEmail' => User::IS_INVALID_EMAIL,
            'remember_token' => $this->generateRandomString(),
        ]);

        return response(['message' => 'User Created Successfully!'], 200);
    }

    // generating a random string for use it as the user remember token.
    function generateRandomString()
    {
        return Str::random(10) . time();
    }
}
