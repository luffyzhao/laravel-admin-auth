<?php
/**
 *
 * Author: luffyzhao@vip.126.com
 * DateTime: 2019/4/3 16:12
 */

namespace LAuth\Http\Controllers;


use LAuth\Http\Requests\Auth\LoginRequest;
use LAuth\Http\Requests\Auth\ProfileUpdateRequest;
use LAuth\Repositories\Menu;
use LAuth\Repositories\User;
use Illuminate\Auth\AuthenticationException;

abstract class AuthController extends Controller
{
    /**
     * @return mixed
     */
    protected function getAuth()
    {
        return $this->getAuth();
    }

    /**
     * login
     * @param LoginRequest $request
     * @return \Illuminate\Http\JsonResponse
     * @throws AuthenticationException
     * @author luffyzhao@vip.126.com
     */
    public function login(LoginRequest $request, Menu $menu)
    {
        $token = $this->getAuth()->attempt($request->only([
            'email', 'password'
        ]));
        $user = $this->getAuth()->user();
        if (!$token || !$user->allowLogin()) {
            throw new AuthenticationException('用户不存在，或者用户被禁用');
        }

        if ($user->role_id === 0) {
            $menus = $menu->get(['id', 'name', 'parent_id', 'title']);
        } else {
            $menus = $user->role->cachedMenus();
        }


        return $this->response([
            'token' => (string)$token,
            'menus' => $menus
        ]);
    }

    /**
     * logout
     * @author luffyzhao@vip.126.com
     */
    public function logout()
    {
        return $this->response($this->getAuth()->logout());
    }

    /**
     * refresh
     * @return \Illuminate\Http\JsonResponse
     * @author luffyzhao@vip.126.com
     */
    public function refresh()
    {
        return $this->response((string)$this->getAuth()->refresh());
    }

    /**
     * profile
     * @author luffyzhao@vip.126.com
     */
    public function profile()
    {
        $user = $this->getAuth()->user();
        $user->load(['role']);
        return $this->response($user);
    }

    /**
     * profileUpdate
     * @param User $user
     * @param ProfileUpdateRequest $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Throwable
     * @author luffyzhao@vip.126.com
     */
    public function profileUpdate(User $user, ProfileUpdateRequest $request)
    {
        return $this->response(
            $user->profileUpdate(
                $this->getAuth()->user(),
                $request->only([
                    'phone'
                ])
            )
        );
    }
}