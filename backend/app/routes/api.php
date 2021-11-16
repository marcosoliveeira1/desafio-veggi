<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskByUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/', function () {
    return response()->json(['message' => 'Jobs API', 'status' => 'Connected']);;
});

Route::apiResource('/users', UserController::class);
Route::apiResource('/user/{id}/tasks', TaskByUserController::class);
Route::apiResource('/tasks', TaskController::class);
