<?php

namespace Database\Factories;

use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "create_user_id" => 1,
            "other_user_id" => User::where("id","!=", 1)->inRandomOrder()->first()
        ];
    }

    /**
     * Configure the model factory.
     *
     * @return $this
     */
    public function configure()
    {
        return $this->afterCreating(function (Room $room) {
            \App\Models\Chat::factory(100)->create([
                'user_id' => $this->faker->randomElement([$room->create_user_id, $room->other_user_id]),
                'room_id' => $room->id,
            ]);
        });
    }
}
