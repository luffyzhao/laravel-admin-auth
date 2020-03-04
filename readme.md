# laravel erp管理后台权限认证

### 安装

>  composer require luffyzhao/laravel-admin-auth

1. 注释 `app.php`  配置文件里的  `App\Providers\RouteServiceProvider::class, `
2. 把`vendor/luffyzhao/laravel-admin-auth/src` 下面的 `package.json`和`webpack.mix.js`拿到根目录
3. 把 `vendor/luffyzhao/laravel-admin-auth/src/Pulishes\resources\vue`目录复制到 `resources` 目录 
