<?php
/**
 *
 * Author: luffyzhao@vip.126.com
 * DateTime: 2019/4/3 16:12
 */

namespace LAuth\Http\Controllers;


use LAuth\Http\Requests\Auth\LoginRequest;
use LAuth\Http\Requests\Auth\ProfileUpdateRequest;
use LAuth\Repositories\User;
use Illuminate\Auth\AuthenticationException;

class AuthController extends Controller
{
    /**
     * login
     * @param LoginRequest $request
     * @author luffyzhao@vip.126.com
     * @return \Illuminate\Http\JsonResponse
     * @throws AuthenticationException
     */
    public function login(LoginRequest $request)
    {
        $token = auth('api')->attempt($request->only([
            'email', 'password'
        ]));
        $user = auth('api')->user();
        if (!$token || !$user->allowLogin()) {
            throw new AuthenticationException('用户不存在，或者用户被禁用');
        }

        $menus = auth('api')->user()->role->cachedMenus();

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
        return $this->response(auth('api')->logout());
    }

    /**
     * refresh
     * @author luffyzhao@vip.126.com
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->response((string)auth('api')->refresh());
    }

    /**
     * profile
     * @author luffyzhao@vip.126.com
     */
    public function profile()
    {
        $user = auth('api')->user();
        $user->load(['role']);
        return $this->response($user);
    }

    /**
     * profileUpdate
     * @param User $user
     * @param ProfileUpdateRequest $request
     * @author luffyzhao@vip.126.com
     * @return \Illuminate\Http\JsonResponse
     * @throws \Throwable
     */
    public function profileUpdate(User $user, ProfileUpdateRequest $request)
    {
        return $this->response(
            $user->profileUpdate(
                auth('api')->user(),
                $request->only([
                    'phone', 'birthday', 'sex', 'password', 'password_confirmation'
                ])
            )
        );
    }
}