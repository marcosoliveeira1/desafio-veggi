<?php

namespace App\Http\Helpers;

class HttpStatus
{
    public static function ok($body)
    {
        return response()->json($body, 200);
    }

    public static function created($body)
    {
        return response()->json($body,201);
    }

    public static function deleted()
    {
        return response()->json([], 204);
    }
    public static function methodNotAllowed()
    {
        return response()->json([
            "error" => "Method not allowed",
        ], 405);
    }

    public static function paramError($message)
    {
        return response()->json([
            "error" => "Param Error",
            "fields" => $message
        ], 400);
    }

    public static function registerNotFound($resource)
    {
        return response()->json([
            "error" =>  "$resource not found"
        ], 404);
    }
}
