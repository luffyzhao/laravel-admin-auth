<?php


namespace LAuth\Providers;


use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Route;

class LAuthServiceProvider extends RouteServiceProvider
{

    public function boot(){
        $this->publishes([
            __DIR__.'/../Resources/Vue' => resource_path('vue'),
        ]);

        $this->loadRoutesFrom(__DIR__.'/routes.php');
    }
}