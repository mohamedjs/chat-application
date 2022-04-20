<?php

namespace App\Http\Services;

interface SmsServiceInterface {
    /**
     * Method sendCode
     *
     * @param string $phone
     * @param string $code
     *
     * @return self
     */
    public function sendCode($phone, $code);

    /**
     * Method getMessage
     *
     * @return string
     */
    public function getMessage();
    /**
     * Method getMessage
     *
     * @return boolean
     */
    public function isSuccess();
}
