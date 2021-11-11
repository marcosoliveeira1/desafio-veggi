<?php

namespace App\Http\Controllers;

use App\Http\Helpers\HttpStatus;
use App\Models\Task;
use Illuminate\Http\Request;


class TaskByUserController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id)
    {
        $tasks = Task::where('user_id', $id)->get();

        return HttpStatus::ok($tasks);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        return HttpStatus::methodNotAllowed();
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        return HttpStatus::methodNotAllowed();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        return HttpStatus::methodNotAllowed();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        return HttpStatus::methodNotAllowed();
    }
}
