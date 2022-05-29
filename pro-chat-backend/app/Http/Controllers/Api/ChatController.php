<?php

namespace App\Http\Controllers\Api;

use App\Events\MessageEvent;
use App\Http\Repositories\ChatRepository;
use App\Http\Requests\MessageRequest;
use App\Http\Resources\MessageResource;
use Illuminate\Http\JsonResponse;

class ChatController extends BaseAPIController
{
    /**
     * chatRepository
     *
     * @var \App\Http\Repositories\ChatRepository
     */
    private $chatRepository;
    /**
     * init controller with constructor
     *
     * @param \App\Http\Repositories\ChatRepository $chatRepository
     */
    public function __construct(ChatRepository $chatRepository)
    {
        $this->chatRepository = $chatRepository;
    }
    /**
     * Method store
     *
     * @param \App\Http\Requests\MessageRequest $request [room_id, message, type]
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(MessageRequest $request): JsonResponse
    {
        $request->merge([
            'user_id' => auth()->id()
        ]);
        $message = $this->chatRepository->createMessage($request->all());
        $message->load(["room", "user"]);
        $user_id = ($message->room->create_user_id != $message->user_id ) ? $message->room->create_user_id
                                                                         : $message->room->other_user_id;
        $messageResource = new MessageResource($message);
        event(new MessageEvent($messageResource, $user_id));
        return $this->OK($messageResource, "add message successfully");
    }
}
