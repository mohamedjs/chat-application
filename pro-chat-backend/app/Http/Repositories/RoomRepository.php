<?php

namespace App\Http\Repositories;
use App\Models\Room;

class RoomRepository
{
    /**
     * The model that use to communication with reference table
     *
     * @var \App\Models\Room
     */
    private $model;
    /**
     * init controller with constructor
     *
     * @param  \App\Models\Room $model
     */
    public function __construct(Room $model)
    {
        $this->model = $model;
    }

    /**
     * Method listRoom
     *
     * @return Collection
     */
    public function listRoom()
    {
        $rooms = $this->model->with("lastMessage")
                            ->where("create_user_id", "=", auth()->id())
                            ->orWhere("other_user_id", "=", auth()->id())->get();
        return $rooms;
    }

    /**
     * Method getRoom
     *
     * @param int $id [room_id]
     *
     * @return \App\Models\Room
     */
    public function getRoom($id): Room
    {
        $room = $this->model->with("messages")->whereId($id)->first();
        return $room;
    }
}
