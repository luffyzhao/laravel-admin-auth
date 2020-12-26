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

        $this->buildClass($module);

        $this->buildMigrationClass($module);

        $this->buildRouteClass($module);

    }


    /**
     * @param $module
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    protected function buildClass($module)
    {
        $stubs = $this->getStub($module);

        foreach ($stubs as $key => $app) {
            if (!$this->alreadyExists($app)) {
                $stub = $this->files->get(__DIR__ . $key);

                foreach ($this->getStrReplaceSearch($module) as $search => $replace) {
                    $stub = str_replace(
                        $search,
                        $replace,
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
     * @param $module
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     * @author luffyzhao@vip.126.com
     */
    protected function buildMigrationClass($module)
    {
        $stubs = $this->getMigrationStub($module);
        foreach ($stubs as $key => $app) {
            $stub = $this->files->get(__DIR__ . $key);

            foreach ($this->getStrReplaceSearch($module) as $search => $replace) {
                $stub = str_replace(
                    $search,
                    $replace,
                    $stub
                );
            }

            $this->files->put(
                $app,
                $stub
            );
        }
    }

    protected function buildRouteClass($module)
    {
        $stubs = $this->getRouteStub($module);
        foreach ($stubs as $key => $app) {
            $stub = $this->files->get(__DIR__ . $key);

            foreach ($this->getStrReplaceSearch($module) as $search => $replace) {
                $stub = str_replace(
                    $search,
                    $replace,
                    $stub
                );
            }

            $this->files->put(
                $app,
                $stub
            );
        }
    }

    /**
     * @param string $module
     * @return array
     */
    protected function getRouteStub(string $module)
    {
        return [
            '/stubs/routes.stub' => base_path('routes/') . 'auth_' . Str::snake($module) . '.php'
        ];
    }


    /**
     * @param string $module
     * @return array
     */
    protected function getMigrationStub(string $module)
    {
        return [
            '/stubs/migration.auth.stub' => database_path('migrations/') . '2020_12_24_000000_create_' . Str::snake($module) . '_auth_module_table.php'
        ];
    }

    /**
     * @param string $module
     * @return array
     */
    protected function getStub(string $module)
    {
        $camel = Str::studly($module);
        return [
            '/stubs/controller.auth.stub' => "\\App\Http\\Controllers\\{$camel}\\AuthController",
            '/stubs/controller.authority.stub' => "\\App\Http\\Controllers\\{$camel}\\Authorities\\AuthorityController",
            '/stubs/controller.menu.stub' => "\\App\Http\\Controllers\\{$camel}\\Authorities\\MenuController",
            '/stubs/controller.role.stub' => "\\App\Http\\Controllers\\{$camel}\\Authorities\\RoleController",
            '/stubs/controller.user.stub' => "\\App\Http\\Controllers\\{$camel}\\Authorities\\UserController",

            '/stubs/model.authority.stub' => "\\App\\Models\\{$camel}Authority",
            '/stubs/model.menu.stub' => "\\App\\Models\\{$camel}Menu",
            '/stubs/model.role.stub' => "\\App\\Models\\{$camel}Role",
            '/stubs/model.user.stub' => "\\App\\Models\\{$camel}User",
            '/stubs/model.log.stub' => "\\App\\Models\\{$camel}Log",

            '/stubs/request.authorities.stub' => "\\App\\Http\\Requests\\{$camel}\\Authorities\\AuthoritiesRequest",
            '/stubs/request.login.stub' => "\\App\\Http\\Requests\\{$camel}\\Auth\\LoginRequest",
            '/stubs/request.menu.stub' => "\\App\\Http\\Requests\\{$camel}\\Authorities\\MenuRequest",
            '/stubs/request.update.password.stub' => "\\App\\Http\\Requests\\{$camel}\\Auth\\UpdatePasswordRequest",
            '/stubs/request.role.stub' => "\\App\\Http\\Requests\\{$camel}\\Authorities\\RoleRequest",
            '/stubs/request.user.status.stub' => "\\App\\Http\\Requests\\{$camel}\\Authorities\\UserStatusRequest",
            '/stubs/request.user.stub' => "\\App\\Http\\Requests\\{$camel}\\Authorities\\UserRequest",

            '/stubs/search.authority.stub' => "\\App\\Http\\Searchs\\{$camel}\\Authorities\\AuthoritySearch",
            '/stubs/search.role.stub' => "\\App\\Http\\Searchs\\{$camel}\\Authorities\\RoleSearch",
            '/stubs/search.user.stub' => "\\App\\Http\\Searchs\\{$camel}\\Authorities\\UserSearch",
            '/stubs/search.profile.log.stub' => "\\App\\Http\\Searchs\\{$camel}\\ProfileLogSearch",

            '/stubs/repositories.authority.stub' => "\\App\\Repositories\\{$camel}Authority",
            '/stubs/repositories.menu.stub' => "\\App\\Repositories\\{$camel}Menu",
            '/stubs/repositories.role.stub' => "\\App\\Repositories\\{$camel}Role",
            '/stubs/repositories.user.stub' => "\\App\\Repositories\\{$camel}User",
            '/stubs/repositories.logs.stub' => "\\App\\Repositories\\{$camel}Log",
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

        $path = $this->laravel['path'] . '/' . str_replace('\\', '/', $name) . '.php';
        $this->makeDirectory($path);
        return $path;
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
        return "App";
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
     * @return array
     */
    protected function getStrReplaceSearch($module)
    {
        return [
            '__Module__' => Str::studly($module),
            '__SModule__' => Str::snake($module),
        ];
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
