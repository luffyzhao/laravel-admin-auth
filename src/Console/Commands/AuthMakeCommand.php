<?php


namespace LAuth\Console\Commands;


use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Str;
use Symfony\Component\Console\Input\InputArgument;

class AuthMakeCommand extends Command
{
    protected $files;
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'make:auth-module';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '创建一个 RABC 权限管理';

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

        $this->buildControllerClass($module);

        $this->buildMigrationClass($module);

    }


    /**
     * @param $module
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    protected function buildMigrationClass($module)
    {
        $stubs = $this->getMigrationStub($module);
        foreach ($stubs as $key => $app) {
            $path = database_path('migrations/') . $app;
            if (!$this->files->exists(database_path('migrations/') . $app)) {
                $stub = $this->getStrReplaceSearch($module, $this->files->get(__DIR__ . $key));

                $this->putFile($path, $stub);
            }
        }
    }


    /**
     * @param $module
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    protected function buildControllerClass($module)
    {
        $stubs = $this->getControllerStub($module);

        foreach ($stubs as $key => $app) {
            if (!$this->alreadyExists($app)) {
                $stub = $this->files->get(__DIR__ . $key);

                $stub = $this->getStrReplaceSearch(
                    $module,
                    $this->files->get(__DIR__ . $key)
                );


                $path = $this->getPath($this->qualifyClass($app));

                $this->putFile($path, $stub);
            }
        }
    }


    /**
     * @param string $module
     * @return array
     */
    protected function getControllerStub(string $module)
    {
        $studly = Str::studly($module);
        return [
            '/stubs/controller.auth.stub' => "\\App\Http\\Controllers\\{$studly}\\AuthController",
            '/stubs/controller.authority.stub' => "\\App\Http\\Controllers\\{$studly}\\Authorities\\AuthorityController",
            '/stubs/controller.menu.stub' => "\\App\Http\\Controllers\\{$studly}\\Authorities\\MenuController",
            '/stubs/controller.role.stub' => "\\App\Http\\Controllers\\{$studly}\\Authorities\\RoleController",
            '/stubs/controller.user.stub' => "\\App\Http\\Controllers\\{$studly}\\Authorities\\UserController",
        ];
    }

    /**
     * @param string $module
     * @return array
     */
    protected function getMigrationStub(string $module)
    {
        $snake = Str::snake($module);

        return [
            '/stubs/migration.auth.stub' => date("Y_m_d_His_") . "create_{$snake}_rbac_auth_table.php",
        ];
    }

    /**
     * Determine if the class already exists.
     *
     * @param string $rawName
     * @return bool
     */
    protected function alreadyExists($rawName)
    {
        return $this->files->exists($this->getPath($this->qualifyClass($rawName)));
    }

    /**
     * Get the destination class path.
     *
     * @param string $name
     * @return string
     */
    protected function getPath($name)
    {
        $name = Str::replaceFirst($this->rootNamespace(), '', $name);

        return $this->laravel['path'] . '/' . str_replace('\\', '/', $name) . '.php';
    }

    /**
     * @param $path
     * @param $stub
     */
    protected function putFile($path, $stub){
        $this->makeDirectory($path);
        $this->files->put(
            $path,
            $stub
        );
    }

    /**
     * Parse the class name and format according to the root namespace.
     *
     * @param string $name
     * @return string
     */
    protected function qualifyClass($name)
    {
        $name = ltrim($name, '\\/');

        $rootNamespace = $this->rootNamespace();

        if (Str::startsWith($name, $rootNamespace)) {
            return $name;
        }

        $name = str_replace('/', '\\', $name);

        return $this->qualifyClass(
            $this->getDefaultNamespace(trim($rootNamespace, '\\')) . '\\' . $name
        );
    }

    /**
     * Get the root namespace for the class.
     *
     * @return string
     */
    protected function rootNamespace()
    {
        return $this->laravel->getNamespace();
    }

    /**
     * Get the default namespace for the class.
     *
     * @param string $rootNamespace
     * @return string
     */
    protected function getDefaultNamespace($rootNamespace)
    {
        return $rootNamespace;
    }

    /**
     * @return array
     */
    protected function getStrReplaceSearch($module, $stub)
    {
        $strReplaceArr = [
            '__Module__' => Str::studly($module),
            '__SModule__' => Str::snake($module)
        ];

        foreach ($strReplaceArr as $key => $value) {
            $stub = str_replace(
                $key,
                $value,
                $stub
            );
        }

        return $stub;
    }

    /**
     * Build the directory for the class if necessary.
     *
     * @param string $path
     * @return string
     */
    protected function makeDirectory($path)
    {
        if (!$this->files->isDirectory(dirname($path))) {
            $this->files->makeDirectory(dirname($path), 0777, true, true);
        }

        return $path;
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
