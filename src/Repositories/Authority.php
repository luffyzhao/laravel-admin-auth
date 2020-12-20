<?php
/**
 *
 * Author: luffyzhao@vip.126.com
 * DateTime: 2019/3/26 10:46
 */

namespace LAuth\Repositories;


use LTools\Repositories\RepositoryAbstract;

abstract class Authority extends RepositoryAbstract
{
    /**
     * @var \LAuth\Models\Authority
     */
    protected $model;

    /**
     * RepositoryAbstract constructor.
     *
     * @param \LAuth\Models\Authority $model
     */
    public function __construct(\LAuth\Models\Authority $model)
    {
        $this->model = $model;
    }

    /**
     * @param array $attributes
     * @return bool|\Illuminate\Database\Eloquent\Model
     * @author: luffyzhao@vip.126.com
     * @datetime: 2019/4/1 15:40
     */
    public function create(array $attributes = [])
    {
        $model = parent::create($attributes);
        if(isset($attributes['menus'])){
            $model->menus()->attach($attributes['menus']);
        }
        return $model;
    }

    /**
     * @param $id
     * @param array $values
     * @return bool|\Illuminate\Database\Eloquent\Model
     * @throws \Throwable
     * @author: luffyzhao@vip.126.com
     * @datetime: 2019/4/1 15:49
     */
    public function update($id, array $values)
    {
        $model = $this->find($id);
        $model->fill($values)->saveOrFail();
        return $model->menus()->sync($values['menus']??[]);
    }

    /**
     * editFind
     * @param $id
     * @author luffyzhao@vip.126.com
     * @return array
     */
    public function editFind($id){
        $row = $this->model->with(['menus'])->findOrFail($id)->toArray();

        return collect($row)->map(function ($item, $key){
            if($key === 'menus'){
                return collect($item)->pluck('id');
            }
            return $item;
        });
    }
}