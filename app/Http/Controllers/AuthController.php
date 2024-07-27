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
        $validated = $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|max:8',
        ]);

        $user = User::create([
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'isValidEmail' => User::IS_INVALID_EMAIL,
            'remember_token' => $this->generateRandomString(),
        ]);

        // sending an email immediately to the user after creating a user event.
        NewUserCreated::dispatch($user);

        return response()->json([
            'message' => 'User Created Successfully!',
            'user' => $user,
        ], 200);
    }

    private $secretKey = "qQKPjndxljuYQi/POiXJa8O19nVO/vTf/DpXO541g=qQKPjndxljuYQi/POiXJa8O19nVO/vTf/DpXO541g=";

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // searching for the user email in the database.
        $user = User::where('email', $validated['email'])->first();

        if(!$user || !Hash::check($validated['password'], $user->password)){
            return response([
                'message' => 'email or password are invalid!',
                'isLoggedIn' => false,
            ], 422);
        }

        if($user){
            if($user->isValidEmail !== User::IS_VALID_EMAIL){
                NewUserCreated::dispatch($user);

                return response([
                    'message' => 'please check your inbox to validate your email first!',
                    'isLoggedIn' => false,
                ], 422);
            }
        }


        return response()->json([
            'message' => 'You are logged in!',
            'isLoggedIn' => true,
            'user' => $user,
            'token' => $user->createToken($this->secretKey)->plainTextToken,
        ], 200);
    }

    // Logout a user (Deleting his token from the database).
    public function logoutUser(Request $request){

        DB::table('personal_access_tokens')
        ->where('tokenable_id', $request->user()->id)
        ->delete();

        return response()->json([
            'message' => 'You Are Logged out!'
        ], 200);
    }

    // validating the user email.
    public function validateEmail($token)
    {
        User::where('remember_token', $token)
            ->update(['isValidEmail' => User::IS_VALID_EMAIL]);

        return redirect('/app/login');
    }

    // generating a random string for use it as the user remember token.
    function generateRandomString()
    {
        return Str::random(10) . time();
    }
}
