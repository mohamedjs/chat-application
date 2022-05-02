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
}
