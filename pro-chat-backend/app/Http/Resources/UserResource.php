<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            "name" => "mohamed",
            "phone" => $this->phone,
            "lastMessage" => [ // object from MessageResource
                "id" => "1",
                "user_id" => "1",
                "room_id" => "1",
                "message" => "السلام عليكم",
                "type" => "1",
                "time" => "11:00"
            ],
            "avatar" => "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
        ];
    }
}
