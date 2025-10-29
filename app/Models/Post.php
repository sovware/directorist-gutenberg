<?php

namespace DirectoristGutenberg\App\Models;

defined( 'ABSPATH' ) || exit;

use DirectoristGutenberg\WpMVC\App;
use DirectoristGutenberg\WpMVC\Database\Eloquent\Model;
use DirectoristGutenberg\WpMVC\Database\Eloquent\Relations\HasMany;
use DirectoristGutenberg\WpMVC\Database\Resolver;

class Post extends Model {
    public static function get_table_name():string {
        return 'posts';
    }

    public function meta(): HasMany {
        return $this->has_many( PostMeta::class, 'post_id', 'ID' );
    }

    public function resolver():Resolver {
        return App::$container->get( Resolver::class );
    }
}