<?php

namespace App\Http\Controllers\Api;
use App\Http\Repositories\UserRepository;
use App\Http\Resources\UserCollection;
use Illuminate\Http\JsonResponse;

class RoomController extends BaseAPIController
{
    /**
     * userRepository
     *
     * @var \App\Http\Repositories\UserRepository
     */
    private $userRepository;
    /**
     * init controller with constructor
     *
     * @param \App\Http\Repositories\UserRepository $userRepository
     */
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    /**
     * Method list all room
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $rooms = $this->userRepository->listUser([["id", "!=", "1"]]);
        return $this->OK(new UserCollection($rooms), "all room return success");
    }
}
