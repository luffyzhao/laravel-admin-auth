<?php

namespace LAuth\Console\Commands;
use Illuminate\Filesystem\Filesystem;

class PublishVueCommand  extends Command
{
    protected $files;
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'publish:vue';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '发布vue';

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
        $this->files->copyDirectory(__DIR__ . "/../../Pulishes/resources/vue", resource_path('vue'));
    }



}