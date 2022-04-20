<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class AddAuthTokenHeader
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
     public function handle($request, Closure $next)
     {
         $cookie_name = env('AUTH_COOKIE_NAME');

         if (!$request->bearerToken()) {
             if ($request->hasCookie($cookie_name)) {
                 $token = $request->cookie($cookie_name);

                 $request->headers->add([
                     'Authorization' => 'Bearer ' . $token
                 ]);
             }
         }

         return $next($request);
     }
}
