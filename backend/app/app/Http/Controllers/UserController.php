<?php

namespace App\Http\Controllers;

use App\Http\Helpers\HttpStatus;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class UserController extends Controller
{
    private $rules;
    public function __construct()
    {
        $this->rules = ['name' => 'required'];
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $users = User::paginate(10);
        return HttpStatus::ok($users);
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

        $user = new User();
        $user->name = $request->input('name');
        $user->save();

        return HttpStatus::created($user);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $user = User::find( $id);

        if(!$user) return HttpStatus::registerNotFound('User');

        return HttpStatus::ok($user);
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

        $user = User::find( $id);

        if(!$user) return HttpStatus::registerNotFound('User');
        $user->name = $request->input('name');
        $user->save();

        return HttpStatus::ok($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $user = User::find( $id);
        if(!$user) return HttpStatus::registerNotFound('User');
        $user->delete();

        return HttpStatus::deleted();
    }
}
