<?php


namespace LAuth\Console\Commands;


use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Str;

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
        if (parent::handle() === false && !$this->option('force')) {
            return;
        }

        $module = $this->argument('name');


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
                $stub = $this->files->get($key);

                foreach ($this->getStrReplaceSearch() as $search) {
                    $stub = str_replace(
                        $search,
                        [Str::camel($module), Str::snake($module)],
                        $stub
                    );
                }

                $this->files->put(
                    $this->getPath($this->qualifyClass($app)),
                    $stub
                );
            }
        }
    }


    /**
     * @param string $module
     * @return array
     */
    protected function getControllerStub(string $module)
    {
        $camel = Str::camel($module);
        return [
            '/stubs/controller.auth.stub' => "\\App\Http\\Controllers\\{$camel}\\{$camel}AuthController",
            '/stubs/controller.authority.stub' => "\\App\Http\\Controllers\\{$camel}\\Authorities\\{$camel}AuthorityController",
            '/stubs/controller.menu.stub' => "\\App\Http\\Controllers\\{$camel}\\Authorities\\{$camel}MenuController",
            '/stubs/controller.role.stub' => "\\App\Http\\Controllers\\{$camel}\\Authorities\\{$camel}RoleController",
            '/stubs/controller.user.stub' => "\\App\Http\\Controllers\\{$camel}\\Authorities\\{$camel}UserController",
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
        return "";
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
    protected function getStrReplaceSearch()
    {
        return [
            '__Module__',
            '__SModule__'
        ];
    }
}