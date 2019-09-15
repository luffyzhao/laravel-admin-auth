<?php


namespace LAuth\Pulishes\seeds;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LAuthTableSeeder extends Seeder
{
    public function run()
    {
        foreach (['authorities', 'menus', 'menu_authority', 'roles', 'role_authority', 'role_menu', 'users'] as $item) {
            $array = $this->getJsonFile($item);
            foreach ($array as $value){
                DB::table($item)->insert($value);
            }
        }
    }

    private function getJsonFile($name): array
    {
        $filename = __DIR__.'/json/'.$name.'.json';
        if (!file_exists($filename)) {
            return [];
        }

        $json = file_get_contents($filename);


        $jsonArr = json_decode($json);

        if (json_last_error() === JSON_ERROR_NONE) {
            return [];
        }


        return $jsonArr['RECORDS'] ?? [];
    }

}