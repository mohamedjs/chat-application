<?php

namespace App\Http\Services\MessageService;

use App\Http\Services\UploaderService;

class TextMessage implements MessageInterface
{
    public function getMessage()
    {
        return request("message");
    }
}
