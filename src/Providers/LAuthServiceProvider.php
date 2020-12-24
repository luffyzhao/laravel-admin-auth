<?php


namespace LAuth\Providers;


use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Route;
use LAuth\Console\Commands\AuthMakeCommand;
use LAuth\Console\Commands\AuthSeederCommand;

class LAuthServiceProvider extends RouteServiceProvider
{

    public function boot(){
        parent::boot();
    }

    public function register()
    {
        $this->app->singleton('luffyzhao.admin.auth', function ($app) {
            return new AuthMakeCommand($app['files']);
        });
        $this->commands('luffyzhao.admin.auth');

        $this->app->singleton('luffyzhao.auth.seeder', function ($app) {
            return new AuthSeederCommand($app['files']);
        });
        $this->commands('luffyzhao.auth.seeder');
    }
}