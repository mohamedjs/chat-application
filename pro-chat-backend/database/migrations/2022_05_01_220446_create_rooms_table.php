<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoomsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("create_user_id");
            $table->unsignedBigInteger("other_user_id");
            $table->foreign("create_user_id")->references("id")->on("users")->onDelete("cascade")->onUpdate("cascade");
            $table->foreign("other_user_id")->references("id")->on("users")->onDelete("cascade")->onUpdate("cascade");
            $table->integer("user_count")->default(2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rooms');
    }
}
