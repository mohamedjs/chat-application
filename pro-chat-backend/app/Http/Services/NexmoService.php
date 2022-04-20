<?php

namespace App\Http\Services;

class NexmoService implements SmsServiceInterface
{
    /**
     * success
     *
     * @var bool
     */
    private $success;
    /**
     * message
     *
     * @var String
     */
    private $message;
    /**
     * key
     *
     * @var String
     */
    private $key;
    /**
     * secret
     *
     * @var String
     */
    private $secret;
    /**
     * Method __construct
     *
     */
    public function __construct()
    {
        $this->key = env("NEXMO_KEY");
        $this->secret = env("NEXMO_SECRET");
        $this->message = "";
        $this->success = false;
    }

   /**
     * Method sendCode
     *
     * @param string $phone
     * @param string $code
     *
     * @return self
     */
    public function sendCode($phone, $code)
    {
        // try {
            $basic  = new \Nexmo\Client\Credentials\Basic($this->key, $this->secret);
            $client = new \Nexmo\Client($basic);

            $client->message()->send([
                'to' => $phone,
                'from' => env("APP_NAME"),
                'text' => "your verification code is ".$code
            ]);
            $this->message = "the code send successfully";
            $this->success = true;
            return $this;
        // } catch (\Throwable $e) {
        //    $this->message   = $e->getMessage();
        //    $this->success = false;
        //    return $this;
        // }
    }

    /**
     * Method getMessage
     *
     * @return string
     */
    public function getMessage()
    {
        return $this->message;
    }
    /**
     * Method getMessage
     *
     * @return boolean
     */
    public function isSuccess()
    {
        return $this->success;
    }
}
