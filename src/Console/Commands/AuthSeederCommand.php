<?php


namespace LAuth\Console\Commands;


use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Symfony\Component\Console\Input\InputArgument;

class AuthSeederCommand
    extends Command
{
    protected $files;
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'make:auth-seeder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '插入 RABC 权限管理基础数据';

    /**
     * AuthMakeCommand constructor.
     * @param Filesystem $files
     */
    public function __construct(Filesystem $files)
    {
        $this->files = $files;
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $module = $this->argument('name');

        foreach (['authorities', 'menus', 'menu_authority', 'roles', 'role_authority', 'role_menu', 'users'] as $item) {
            $array = $this->getDatabaseArray($item);
            foreach ($array as $value) {
                DB::table(Str::snake($module) . '_' . $item)->insert($value);
            }
        }

    }

    /**
     * @param $name
     * @return array
     * @author luffyzhao@vip.126.com
     */
    protected function getDatabaseArray($name): array
    {
        $filename = __DIR__ . '/../../Pulishes/seeds/' . $name . '/1.json';
        if (!$this->files->exists($filename)) {
            return [];
        }
        try {
            $json = file_get_contents($filename);
            $jsonArr = \GuzzleHttp\json_decode($json, true);
            return $jsonArr['RECORDS'] ?? [];
        } catch (\Exception $exception) {
            $this->output->error($exception->getMessage());
            $this->output->newLine();
            return [];
        }
    }

    /**
     * Get the console command arguments.
     *
     * @return array
     */
    protected function getArguments()
    {
        return [
            ['name', InputArgument::REQUIRED, 'The name of the class'],
        ];
    }
}