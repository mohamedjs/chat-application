<?php

namespace App\Http\Repositories;

use App\Http\Services\MessageService\MessageFactory;
use App\Http\Services\MessageService\MessageStrategy;
use App\Models\Chat;

class ChatRepository
{
    /**
     * The model that use to communication with reference table
     *
     * @var \App\Models\Chat
     */
    private $model;
    /**
     * init controller with constructor
     *
     * @param  \App\Models\Chat $model
     */
    public function __construct(Chat $model)
    {
        $this->model = $model;
    }

    /**
     * Method createMessage
     *
     * @param array $request [room_id, message, type]
     *
     * @return \App\Models\Chat
     */
    public function createMessage($request): Chat
    {
        $messageType = new MessageFactory($request['type']);
        $message  = new MessageStrategy($messageType->getTypeInstance());
        $request['message'] = $message->getMessage();
        $chat = $this->model->create($request);
        return $chat;
    }
}
