<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "create_user" => new UserResource($this->createUser),
            "other_user"  => new UserResource($this->otherUser),
            "user"        => (auth()->id() != $this->create_user_id) ? new UserResource($this->createUser) : new UserResource($this->otherUser),
            "lastMessage" => !request()->route('id') ? new MessageResource($this->lastMessage) : (object)[],
            "messages"    => request()->route('id') ? MessageResource::collection($this->messages->reverse()) : []
        ];
    }
}
