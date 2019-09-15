<?php


namespace LAuth\Providers;


use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Route;

class LAuthServiceProvider extends RouteServiceProvider
{

    public function boot(){
        $this->publishes([
            __DIR__.'/../Pulishes/resources/Vue' => resource_path('vue'),
        ]);

        $this->loadRoutesFrom(__DIR__.'/routes.php');

        $this->loadMigrationsFrom(__DIR__.'/../Pulishes/resources/migrations');
    }
}