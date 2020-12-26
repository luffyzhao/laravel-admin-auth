<?php


namespace LAuth\Http\Middleware;


use Closure;
use Illuminate\Cookie\Middleware\EncryptCookies as Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class LoggerMiddleware extends Middleware
{
    public function handle($request, Closure $next, ...$guards)
    {
        $response = $next($request);
        if(!empty($guards)){
            foreach ($guards as $guard) {
                if (Auth::guard($guard)->check()) {
                    $class = '\\App\\Repositories\\'. Str::studly($guard . '_log');
                    if(class_exists($class)){
                        app($class)->create([]);
                    }
                }
            }
        }
        return $response;
    }
}
