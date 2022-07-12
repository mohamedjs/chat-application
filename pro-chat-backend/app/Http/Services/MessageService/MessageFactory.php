<?php

namespace App\Http\Services\MessageService;

use App\Constants\MessageType;

class MessageFactory
{
    public $messageType;

    public function __construct($messageType)
    {
        $this->messageType = $messageType;
    }

    public function getTypeInstance()
    {
        if($this->messageType == MessageType::TEXT) {
            return new TextMessage;
        }
        if($this->messageType == MessageType::FILE) {
            return new FileMessage;
        }
    }
}
