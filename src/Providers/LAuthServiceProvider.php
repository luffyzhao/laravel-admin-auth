<?php


namespace LAuth\Providers;


use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Route;

class LAuthServiceProvider extends RouteServiceProvider
{

    public function boot(){
        parent::boot();

        if(file_exists(base_path('routes/lauth.php'))){
            $this->loadRoutesFrom(base_path('routes/lauth.php'));
        }else{
            $this->loadRoutesFrom(__DIR__.'/../routes.php');
        }

        $this->loadMigrationsFrom(__DIR__.'/../Pulishes/migrations');

        $this->publishes([
            __DIR__.'/../Pulishes/resources/vue' => $this->app->resourcePath('vue'),
        ], 'laravel-vue-admin');
    }
}