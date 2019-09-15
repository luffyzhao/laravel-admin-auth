<?php


namespace LAuth\Plugins\UEditor;


class Config implements Contracts\UEditor
{
    public function handle(): array
    {
        return config('ueditor');
    }
}