<?php


namespace LAuth\Providers;


use App\Providers\RouteServiceProvider;
use Illuminate\Cache\Console\ClearCommand as CacheClearCommand;
use Illuminate\Console\Application as Artisan;
use Illuminate\Support\Facades\Route;
use LAuth\Console\Commands\AuthMakeCommand;

class LAuthServiceProvider extends RouteServiceProvider
{

    public function boot(){
        parent::boot();
    }

    public function register(){
        $this->app->singleton('command.make.auth-module', function ($app) {
            return new AuthMakeCommand($app['files']);
        });

        $commands = ['AuthMakeCommand' => 'command.make.auth-module'];
        Artisan::starting(function ($artisan) use ($commands) {
            $artisan->resolveCommands($commands);
        });
    }
}
