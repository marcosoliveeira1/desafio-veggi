<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Validator;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function requestIsValid($request, $rules)
    {

        $validator = Validator::make($request->all(), $rules, $messages = [
//            'same' => 'The :attribute and :other must match.',
//            'size' => 'The :attribute must be exactly :size.',
//            'between' => 'The :attribute value :input is not between :min - :max.',
            'in' => 'The :attribute must be one of the following types: :values',
        ]);

        if ($validator->fails()) {
            return $validator->messages();
        }
    }



}
