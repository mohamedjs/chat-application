<?php

namespace App\Http\Services\MessageService;

class MessageStrategy
{
    public $messageInterface;

    public function __construct(MessageInterface $messageInterface)
    {
        $this->messageInterface = $messageInterface;
    }

    public function getMessage()
    {
        return $this->messageInterface->getMessage();
    }
}
