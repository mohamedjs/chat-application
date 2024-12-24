<?php

namespace App\Http\Repositories;

use App\Models\User;

class UserRepository

{
    /**
     * The model that use to communication with reference table
     *
     * @var \App\Models\User
     */
    private $model;
    /**
     * init controller with constructor
     *
     * @param  \App\Models\User $model
     */
    public function __construct(User $model)
    {
        $this->model = $model;
    }
    /**
     * create user with user data
     *
     * @param array $data [phone,first_name, last_name, bio, nick_name]
     */
    public function createUser($data)
    {
        $this->model->create($data);
    }
    /**
     * create user with user data
     *
     * @param int $id
     * @return \App\Models\User|Null
     */
    public function findUserById($id)
    {
        $user = $this->model->find($id);
        return $user;
    }
    /**
     * Method findUserByPhone
     *
     * @param string $phone
     * @return QueryBuilder|Null
     */
    public function findUserByPhone($phone)
    {
        $user = $this->model->wherePhone($phone);
        return $user;
    }
    /**
     * Method findUserByCode
     *
     * @param string $code
     * @return QueryBuilder|Null
     */
    public function findUserByCode($code)
    {
        $user = $this->model->whereCode($code);
        return $user;
    }

    /**
     * Method firstORcreate
     *
     * @param array $search
     * @param array $data
     *
     * @return \App\Models\User
     */
    public function firstORcreate($search, $data)
    {
        $user = $this->model->firstOrCreate($search, $data);
        return $user;
    }

    /**
     * Method listUser
     *
     * @param araay $condition
     *
     * @return void
     */
    public function listUser($condition)
    {
        $users = $this->model->where($condition)->get();
        return $users;
    }

    /**
     * Method updateUser
     *
     * @param \App\Models\User
     * @param \App\Http\Requests\ProfileRequest $request [first_name, last_name, email]
     *
     * @return \App\Models\User
     */
    public function updateUser($user, $request): User
    {
        $user = tap($user)->update($request+["complete_profile" => 1]);
        return $user;
    }

}
