<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\VerifyRequest;
use App\Http\Services\AuthService;
use App\Jobs\SmsJob;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse as Response;

class AuthController extends BaseApiController
{
    /**
     * authService
     *
     * @var \App\Http\Services\AuthService
     */
    private $authService;
    /**
     * init controller with constructor
     *
     * @param \App\Http\Services\AuthService $authService
     */
    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }
    /**
     * create or check that user exists and send Verification Code to user
     *
     * @param \App\Http\Requests\LoginRequest $request [phone]
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request): Response
    {
        if(!$this->authService->checkOrCreate($request->phone)){
            return $this->error([], "an error occur when call database");
        }
        dispatch(new SmsJob($this, $request->phone));
        return $this->OK([], "You'll receive code now");
    }
    /**
     * handle send verification code steps and show error if exists
     *
     * @param string phone
     * @return void
     */
    public function sendVerificationCode($phone): void
    {
        // try {
            $sms = $this->authService->sendVerificationCode($phone);
        // } catch (\Throwable $th) {
        //     throw new \Throwable('there are an error occur when send verification code');
        // }

        if($sms && !$sms->isSuccess()){
            throw new \Exception($sms->getMessage());
        }

    }

    /**
     * Method codeVerified
     *
     * @param \App\Http\Requests\VerifyRequest $request [code]
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function codeVerified(VerifyRequest $request): Response
    {
        try {
            $user = $this->authService->checkCode($request->code);
            if($user) {
                $data = $this->authService->generateToken($user);
                return $this->ok($data, "welcome to home page");
            }
            return $this->error([], "code that you entered is error");
        } catch (\Exception $e) {
            return $this->error([], $e->getMessage());
        }

    }

}
