<?php
/**
 *
 * Author: luffyzhao@vip.126.com
 * DateTime: 2019/3/26 11:11
 */

namespace LAuth\Http\Controllers\Authorities;

use LAuth\Http\Requests\Authorities\AuthoritiesRequest;
use LAuth\Http\Searchs\Authorities\AuthoritySearch;
use LAuth\Repositories\Authority;
use LAuth\Http\Controllers\Controller;
use LAuth\Repositories\Menu;

abstract class AuthorityController extends Controller
{
    /**
     * @var Authority
     */
    protected $authority;

    public function __construct(Authority $authority)
    {
        $this->authority = $authority;
    }

    /**
     * @param AuthoritySearch $search
     * @return \Illuminate\Http\JsonResponse
     * @author: luffyzhao@vip.126.com
     * @datetime: 2019/3/28 11:04
     */
    public function index(AuthoritySearch $search)
    {
        return $this->response(
            $this->authority->paginate($search->toArray())
        );
    }

    /**
     * @param AuthoritiesRequest $request
     * @author: luffyzhao@vip.126.com
     * @datetime: 2019/3/28 13:27
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(AuthoritiesRequest $request)
    {
        return $this->response(
            $this->authority->create(
                $request->only([
                    'name', 'uri', 'description', 'menus'
                ])
            )
        );
    }


    /**
     * @param Menu $menu
     * @return \Illuminate\Http\JsonResponse
     * @author: luffyzhao@vip.126.com
     * @datetime: 2019/4/1 15:33
     */
    public function create(Menu $menu){
        return $this->response(
            $menu->get(['id', 'name as title', 'parent_id'])
        );
    }

    /**
     * @param Menu $menu
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     * @author: luffyzhao@vip.126.com
     * @datetime: 2019/4/1 15:43
     */
    public function edit(Menu $menu, $id){
        return $this->response([
            'menus' => $menu->get(['id', 'name as title', 'parent_id']),
            'row' => $this->authority->editFind($id)
        ]);
    }

    /**
     * @param AuthoritiesRequest $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Throwable
     * @author: luffyzhao@vip.126.com
     * @datetime: 2019/3/28 15:20
     */
    public function update(AuthoritiesRequest $request, $id){
        return $this->response(
            $this->authority->update($id, $request->only([
                'name', 'uri', 'description', 'menus'
            ]))
        );
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     * @author: luffyzhao@vip.126.com
     * @datetime: 2019/3/27 19:21
     * @throws \Exception
     */
    public function destroy($id){
        return $this->response(
            $this->authority->delete($id)
        );
    }


}