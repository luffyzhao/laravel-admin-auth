<?php


namespace LAuth\Providers;


use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Route;

class LAuthServiceProvider extends RouteServiceProvider
{

    public function boot(){
        parent::boot();

        $this->publishes([
            __DIR__.'/../Pulishes/resources/vue' => $this->app->resourcePath('vue-test'),
        ], 'laravel-vue-admin');
    }
}