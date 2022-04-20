<?php

namespace App\Providers;

use App\Http\Services\NexmoService;
use App\Http\Services\SmsServiceInterface;
use App\Events\SmsEvent;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Queue;
use Illuminate\Queue\Events\JobProcessed;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(SmsServiceInterface::class, NexmoService::class);

         // make your own query file
         if(env('APP_DEBUG')) {
            \DB::listen(function($query){
                \File::append(
                    storage_path('logs/query.log'),
                    $query->sql . '[' . implode(', ', $query->bindings) . ']' . PHP_EOL
                );
            });
        }
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->handleJobEvents();
    }

    /**
     * Method handleJobEvents
     *
     * @return void
     */
    private function handleJobEvents()
    {
        Queue::after(function (JobProcessed $event) {
            switch ($event->job->resolveName()) {
                case 'App\Jobs\SmsJob':
                    event(new SmsEvent(true, "code send to you success"));
                    break;
                default:
                    break;
            }
        });
    }
}
