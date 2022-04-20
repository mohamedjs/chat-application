<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BaseAPIController extends Controller
{
    public function OK($data= [], $message = "")
    {
        return response()->json(['data' => $data, 'message' => $message, 'status' => true], 200);
    }

    public function delete($data= [], $message = "")
    {
        return response()->json(['data' => $data, 'message' => $message, 'status' => true]);
    }

    public function error($result = [], $message="")
    {
        return response()->json(['data' => $result, 'message' => $message, 'status' => false], 417);
    }
}
