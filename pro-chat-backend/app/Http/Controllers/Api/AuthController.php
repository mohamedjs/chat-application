<?php

namespace App\Http\Controllers\Api;

use App\Http\Repositories\UserRepository;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\ProfileRequest;
use App\Http\Requests\VerifyRequest;
use App\Http\Services\AuthService;
use App\Http\Requests\UserImageRequest;
use App\Http\Resources\UserResource;
use App\Jobs\SmsJob;
use Illuminate\Http\JsonResponse as Response;

class AuthController extends BaseAPIController
{
    /**
     * authService
     *
     * @var \App\Http\Services\AuthService
     */
    private $authService;
    /**
     * userRepository
     *
     * @var \App\Http\Repositories\UserRepository
     */
    private $userRepository;
    /**
     * init controller with constructor
     *
     * @param \App\Http\Services\AuthService $authService
     * @param \App\Http\Repositories\UserRepository $userRepository
     */
    public function __construct(AuthService $authService, UserRepository $userRepository)
    {
        $this->authService = $authService;
        $this->userRepository = $userRepository;
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
        $sms = $this->authService->sendVerificationCode($phone);
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
                $data['user'] = new UserResource($user);
                return $this->ok($data, "welcome to home page");
            }
            return $this->error([], "code that you entered is error");
        } catch (\Exception $e) {
            return $this->error([], $e->getMessage());
        }

    }

    /**
     * Method completeProfile
     *
     * @param \App\Http\Requests\ProfileRequest $request [first_name, last_name, email]
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function completeProfile(ProfileRequest $request): Response
    {
        $user = $this->userRepository->updateUser(auth()->user(), $request->all());
        return $this->OK($user, "update user data Successfully");
    }

    /**
     * Method UploadUserImage
     *
     * @param \App\Http\Requests\UserImageRequest $request [image]
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadUserImage(UserImageRequest $request): Response
    {
        $this->authService->uploadImage(auth()->user(), $request);
        return $this->OK([], "upload user image Successfully");
    }


}
