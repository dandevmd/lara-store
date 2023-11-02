<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use Request;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);


        return response([
            'user' => $user,
            'token' => $user->createToken('main')->plainTextToken
        ]);
    }

    public function login(LoginRequest $request)
    {
        $data = $request->validated();
        $remember = $data['remember'] ?? null;
        unset($data['remember']);

        if (!auth()->attempt($data, $remember)) {
            return response([
                'message' => 'Provided credentials are not correct'
            ], 422);
        }

        return response([
            'user' => auth()->user(),
            'token' => auth()->user()->createToken('main')->plainTextToken,
        ]);
    }


    public function me(Request $request)
    {
        return \Auth::user();
    }
    public function logout(Request $request)
    {
        auth()->user()->currentAccessToken()->delete();
        return response([
            'message' => 'Logged out'
        ]);
    }
}