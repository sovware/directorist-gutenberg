<?php

namespace DirectoristGutenberg\App\Models;

defined( 'ABSPATH' ) || exit;

use DirectoristGutenberg\WpMVC\App;
use DirectoristGutenberg\WpMVC\Database\Eloquent\Model;
use DirectoristGutenberg\WpMVC\Database\Resolver;

class UserMeta extends Model {
    public static function get_table_name():string {
        return 'usermeta';
    }

    public function resolver():Resolver {
        return App::$container->get( Resolver::class );
    }
}