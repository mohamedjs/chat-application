<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['create_user_id', 'other_user_id', 'user_count'];

    public function messages()
    {
        return $this->hasMany(Chat::class, "room_id", "id");
    }
    public function lastMessage()
    {
        return $this->hasMany(Chat::class, "room_id", "id")->orderBy("created_at", "desc");
    }
    public function createUser()
    {
        return $this->belongsTo(User::class, "create_user_id", "id");
    }
    public function otherUser()
    {
        return $this->belongsTo(User::class, "other_user_id", "id");
    }


}
