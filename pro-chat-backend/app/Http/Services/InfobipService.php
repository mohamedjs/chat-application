<?php

namespace App\Http\Services;

use GuzzleHttp\Client;

class InfobipService implements SmsServiceInterface
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
     * @var string
     */
    private $message;

    /**
     * baseUrl
     *
     * @var string
     */
    private $baseUrl;

    /**
     * apiKey
     *
     * @var string
     */
    private $apiKey;

    /**
     * Method __construct
     */
    public function __construct()
    {
        $this->baseUrl = env("INFOBIP_BASE_URL", "https://1grg6d.api.infobip.com");
        $this->apiKey = env("INFOBIP_API_KEY", "b23e74c3dbe0d2005edba91b4b0d990b-fe0adc39-d8db-4219-a9fc-87b04f682b90");
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
        $client = new Client();

        try {
            $response = $client->post($this->baseUrl . '/sms/2/text/advanced', [
                'headers' => [
                    'Authorization' => 'App ' . $this->apiKey,
                    'Content-Type' => 'application/json',
                ],
                'body' => json_encode([
                    'messages' => [
                        [
                            'destinations' => [
                                [
                                    'to' => $phone
                                ]
                            ],
                            'from' => env("APP_NAME"),
                            'text' => "Your verification code is " . $code
                        ]
                    ]
                ])
            ]);

            if ($response->getStatusCode() === 200) {
                $this->message = "The code was sent successfully.";
                $this->success = true;
            } else {
                $this->message = "Failed to send the code. Status code: " . $response->getStatusCode();
                $this->success = false;
            }
        } catch (\Exception $e) {
            $this->message = "An error occurred: " . $e->getMessage();
            $this->success = false;
        }

        return $this;
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
     * Method isSuccess
     *
     * @return bool
     */
    public function isSuccess()
    {
        return $this->success;
    }
}
