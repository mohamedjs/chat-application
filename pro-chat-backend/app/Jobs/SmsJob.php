<?php

namespace App\Jobs;

use App\Events\SmsEvent;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SmsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $authController;
    private $phone;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(AuthController $authController, $phone)
    {
        $this->authController = $authController;
        $this->phone = $phone;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->authController->sendVerificationCode($this->phone);
    }

    /**
     * Handle a job failure.
     *
     * @param \Throwable $exception
     *
     * @return void
     */
    public function failed(\Throwable $exception)
    {
      \File::append(storage_path('logs') . '/' . basename(get_class($this)) . '.log', $exception->getMessage().PHP_EOL);
      event(new SmsEvent(false, $exception->getMessage()));
    }
}
