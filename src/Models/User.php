<?php
/**
 *
 * Author: luffyzhao@vip.126.com
 * DateTime: 2019/3/26 10:44
 */

namespace LAuth\Models;


use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

abstract class  User extends Authenticatable
{
    protected $fillable = ['role_id', 'name', 'phone', 'email', 'password', 'status'];

    protected $hidden = [
        'password'
    ];

    /**
     * @return BelongsTo
     * @author luffyzhao@vip.126.com
     */
    abstract public function role(): BelongsTo;

    /**
     * @param $value
     * @author: luffyzhao@vip.126.com
     * @datetime: 2019/3/29 19:48
     */
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    /**
     * 允许登录
     * @return bool
     * @author luffyzhao@vip.126.com
     */
    public function allowLogin(){
        return $this->getAttribute('status') === 1;
    }
}