<?php

namespace App\Http\Controllers;

use App\Http\Helpers\HttpStatus;
use App\Models\Task;
use App\Models\User;
use App\Rules\IsValidTaskStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class TaskController extends Controller
{
    private $rules;
    public function __construct()
    {
        $this->rules = [
            'description' => 'required',
            'user_id' => 'required',
            'status' => ['required', new IsValidTaskStatus]
        ];
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return HttpStatus::methodNotAllowed();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {

        if ($errorMessages = $this->requestIsValid($request, $this->rules)) {
            return HttpStatus::paramError($errorMessages);
        }

        $userExists = User::find($request->input('user_id'));

        if(!$userExists) return HttpStatus::registerNotFound('User');

        $Task = new Task();
        $Task->description = $request->input('description');
        $Task->status = $request->input('status');
        $Task->user_id = $request->input('user_id');
        $Task->save();

        return HttpStatus::created($Task);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $Task = Task::find( $id);

        if(!$Task) return HttpStatus::registerNotFound('Task');

        return HttpStatus::ok($Task);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $id)
    {
        if ($errorMessages = $this->requestIsValid($request, $this->rules)) {
            return HttpStatus::paramError($errorMessages);
        }
        $Task = Task::find( $id);

        if(!$Task) return HttpStatus::registerNotFound('Task');
        $Task->description = $request->input('description');
        $Task->status = $request->input('status');
        $Task->save();

        return HttpStatus::ok($Task);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $Task = Task::find( $id);
        if(!$Task) return HttpStatus::registerNotFound('Task');
        $Task->delete();

        return HttpStatus::deleted();
    }
}
