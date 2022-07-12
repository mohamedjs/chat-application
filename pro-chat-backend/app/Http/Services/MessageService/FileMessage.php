<?php

namespace App\Http\Services\MessageService;

use App\Http\Services\UploaderService;

class FileMessage implements MessageInterface
{
    public function getMessage()
    {
        $uploaderService = new UploaderService();
        $messages = '';
        foreach (request()->file("message") as $file) {
            $messages .= $uploaderService->upload($file, "message");
            $messages .= '-';
        }
        return $messages;
    }
}
