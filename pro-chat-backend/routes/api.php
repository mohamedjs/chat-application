<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RoomController;
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
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post("complete-profile", [AuthController::class, "completeProfile"]);
        Route::post("upload-image", [AuthController::class, "uploadUserImage"]);
        Route::get("rooms", [RoomController::class, "index"]);
    });
});
