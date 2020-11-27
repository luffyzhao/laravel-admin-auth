<?php
/**
 * Created by PhpStorm.
 * User: luffy
 * Date: 2019/5/8
 * Time: 19:27
 */

namespace LAuth\Http\Requests\Authorities;


use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class UserRequest extends FormRequest
{
    /**
     * @return array
     * @author: luffyzhao@vip.126.com
     * @datetime: 2019/3/29 15:27
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'min:2', 'max:20'],
            'phone' => ['required', 'regex:/^1[34578]\d{9}$/'],
            'role_id' => ['required', Rule::exists('roles', 'id')],
            'password' => ['nullable', 'min:6', 'max:20', 'confirmed'],
            'password_confirmation' => ['nullable',],
            'roles' => ['array', 'nullable'],
            'roles.*' => ['integer', Rule::exists('roles', 'id')],
            'status' => ['required', 'in:1,0']
        ];
    }

    /**
     * @return array
     * @author: luffyzhao@vip.126.com
     * @datetime: 2019/3/29 15:27
     */
    public function attributes(): array
    {
        return [
            'name' => '用户姓名',
            'email' => '用户邮箱',
            'phone' => '手机号码',
            'role_id' => '所属部门',
            'password' => '密码',
            'password_confirmation' => '确认密码',
            'roles' => '部门',
            'status' => '状态',
        ];
    }

    /**
     * withValidator
     * @param Validator $validator
     * @author luffyzhao@vip.126.com
     */
    public function withValidator(Validator $validator){
        if($this->route()->getName() === 'user.update'){
            $validator->addRules([
                'email' => ['required', 'email', Rule::unique('users')->ignore($this->route('user'))],
            ]);
        }else{
            $validator->addRules([
                'email' => ['required', 'email', Rule::unique('users')],
            ]);
        }
    }
}