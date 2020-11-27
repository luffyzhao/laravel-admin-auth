<?php
/**
 *
 * Author: luffyzhao@vip.126.com
 * DateTime: 2019/3/29 18:35
 */

namespace LAuth\Http\Requests\Authorities;


use Illuminate\Foundation\Http\FormRequest;

class UserStatusRequest extends FormRequest
{
    /**
     * @return array
     * @author: luffyzhao@vip.126.com
     * @datetime: 2019/3/29 15:27
     */
    public function rules(): array
    {
        return [
            'status' => ['required', 'in:0,1']
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
            'status' => '状态',
        ];
    }
}