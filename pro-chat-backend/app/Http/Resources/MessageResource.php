<?php

namespace App\Http\Resources;

use App\Constants\MessageType;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
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
            "user" => new UserResource($this->user),
            "room_id" => $this->room_id,
            "message" => $this->type == MessageType::TEXT ?$this->message : $this->handleMessage($this->message),
            "type" => $this->type,
            "time" => $this->created_at->format("h:i a")
        ];
    }

    public function handleMessage ($message) {
        $messages = explode('-', $message);
        foreach ($messages as $key => $value) {
            $newMessage[] = url($value);
        }
        return implode('-', $newMessage);
    }
}
