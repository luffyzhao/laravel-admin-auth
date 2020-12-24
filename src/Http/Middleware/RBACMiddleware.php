<?php
/**
 * Created by PhpStorm.
 * User: luffy
 * Date: 2019/4/17
 * Time: 16:51
 */

namespace LAuth\Http\Middleware;


use Closure;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Middleware\Authenticate;

class RBACMiddleware extends Authenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @param  string[] ...$guards
     * @return mixed
     *
     * @throws \Illuminate\Auth\AuthenticationException
     * @throws AuthorizationException
     */
    public function handle($request, Closure $next, ...$guards)
    {
        try{
            $this->authenticate($request, $guards);
        }catch (AuthenticationException $exception){
            throw new AuthorizationException('登录失效,请重新登录');
        }

        $user = $this->auth->guard()->user();

        if(!$user->allowLogin()){
            throw new AuthorizationException('用户被禁用,请联系管理员');
        }

        if ($request->route()->getName() !== null && $user) {
            if($user->role_id !== null){
                if (!($user->role && $user->role->hasPermission($request->route()->getName()))) {
                    throw new AuthorizationException('没有相关权限，请联系管理员添加');
                }
            }
        }

        return $next($request);
    }
}