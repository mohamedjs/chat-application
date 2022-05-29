<?php

namespace App\Http\Controllers\Api;
use App\Http\Repositories\RoomRepository;
use App\Http\Requests\MessageRequest;
use App\Http\Resources\MessageResource;
use App\Http\Resources\RoomCollection;
use App\Http\Resources\RoomResource;
use Illuminate\Http\JsonResponse;

class RoomController extends BaseAPIController
{
    /**
     * roomRepository
     *
     * @var \App\Http\Repositories\RoomRepository
     */
    private $roomRepository;
    /**
     * init controller with constructor
     *
     * @param \App\Http\Repositories\RoomRepository $roomRepository
     */
    public function __construct(RoomRepository $roomRepository)
    {
        $this->roomRepository = $roomRepository;
    }
    /**
     * Method list all room
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $rooms = $this->roomRepository->listRoom();
        return $this->OK(new RoomCollection($rooms), "all room return success");
    }

    /**
     * Method show
     *
     * @param int $id [roomId]
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $room = $this->roomRepository->getRoom($id);
        return $this->OK(new RoomResource($room), "get room data");
    }

    /**
     * Method store
     *
     * @param \App\Http\Requests\MessageRequest $request [room_id, message, type]
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(MessageRequest $request)
    {
        $message = $this->roomRepository->createMessage($request->all());
        return $this->OK(new MessageResource($message), "add message successfully");
    }
}
