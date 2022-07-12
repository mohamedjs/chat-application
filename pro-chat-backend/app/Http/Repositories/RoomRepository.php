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
        $rooms = $this->model->with(["lastMessage", "lastMessage.user", 'createUser', 'otherUser'])
                            ->where("create_user_id", "=", auth()->id())
                            ->orWhere("other_user_id", "=", auth()->id())->get()
                            ->sortByDesc('lastMessage.created_at');
        if(request()->filled("search")){
            $rooms = $rooms->filter(function ($room) {
                $search = strtolower(request("search"));
                if(auth()->id() != $room->create_user_id){
                    return strpos(strtolower($room->createUser->name()), $search) !== false;
                }
                return strpos(strtolower($room->otherUser->name()), $search) !== false;
            })->values();
        }
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
        $room = $this->model->with(["messages" => function($query) {
            $query->orderByDesc("created_at")->paginate(10);
        },'createUser', 'otherUser', 'messages.user'])->whereId($id)->first();
        return $room;
    }
}
