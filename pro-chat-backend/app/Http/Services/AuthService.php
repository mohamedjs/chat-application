<?php

namespace App\Http\Services;

use App\Http\Repositories\UserRepository ;

class AuthService
{
    /**
     * userRepository
     *
     * @var \App\Http\Repositories\UserRepository
     */
    private $userRepository;
    /**
     * smsServiceInterface
     *
     * @var SmsServiceInterface
     */
    private $smsServiceInterface;
    /**
     * init controller with constructor
     *
     * @param  \App\Http\Repositories\UserRepository $userRepository
     * @param  SmsServiceInterface $smsServiceInterface
     */
    public function __construct(UserRepository $userRepository, SmsServiceInterface $smsServiceInterface)
    {
        $this->userRepository      = $userRepository;
        $this->smsServiceInterface = $smsServiceInterface;
    }
    /**
     * Method generateCode
     *
     * @return string
     */
    public function generateCode()
    {
        $code = rand(11111,99999);
        return $code;
    }
    /**
     * check that phone number have record in database or create new record
     *
     * @param string $phone
     * @return boolean
     */
    public function checkOrCreate($phone)
    {
        try {
            if(!$this->userRepository->findUserByPhone($phone)->first()) {
                $this->userRepository->createUser(["phone" => $phone]);
            }
            return true;
        } catch (\Throwable $th) {
            return false;
        }
    }
    /**
     * generate code and send code to phone number
     *
     * @param string $phone
     *
     * @return smsServiceInterface
     */
    public function sendVerificationCode($phone)
    {
        $code = $this->generateCode();
        $sms = $this->smsServiceInterface->sendCode($phone, $code);
        if($sms->isSuccess()) {
            $this->userRepository->findUserByPhone($phone)->update(["code" => $code]);
        }
        return $sms;
    }
    /**
     * Method checkCode
     *
     * @param string $code
     *
     * @return \App\Models\User
     */
    public function checkCode($code)
    {
        return $this->userRepository->findUserByCode($code)->first();
    }

    /**
     * Method generateToken
     *
     * @param \App\Models\User $user
     *
     * @return array
     */
    public function generateToken($user)
    {
        $expired_token = 7;
        $token = $user->createToken($user->phone);
        $this->getCookie($token->plainTextToken, $expired_token);
        return ['token' => $token->plainTextToken];
    }
    /**
     * getCookie
     * generate cookie with  access_token, token, with time
     * @param  string $token
     * @param  int $time
     * @return cookie
     */
    private function getCookie($token,$time)
    {
      return cookie(
            env('AUTH_COOKIE_NAME'),
            $token,
            $time*24*60
      );
    }
}
