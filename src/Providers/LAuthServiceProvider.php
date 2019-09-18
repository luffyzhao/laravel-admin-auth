<?php


namespace LAuth\Providers;


use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Route;

class LAuthServiceProvider extends RouteServiceProvider
{

    public function boot(){
        $this->loadRoutesFrom(__DIR__.'/../routes.php');

        $this->loadMigrationsFrom(__DIR__.'/../Pulishes/migrations');
    }
}