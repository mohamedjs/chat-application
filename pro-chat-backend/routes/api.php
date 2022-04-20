<?php

use App\Http\Controllers\Api\AuthController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->group(function () {
    Route::post("login", [AuthController::class, "login"]);
    Route::post("verify", [AuthController::class, "codeVerified"]);
    Route::middleware(['auth:sanctum', 'api_cookie'])->group(function () {
        Route::get("home",function(){
            return response()->json(['status' => "ok"]);
        });
    });
});
