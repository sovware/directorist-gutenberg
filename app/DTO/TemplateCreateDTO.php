<?php

namespace DirectoristGutenberg\App\DTO;

defined( "ABSPATH" ) || exit;

use DirectoristGutenberg\WpMVC\DTO\DTO;

class TemplateCreateDTO extends DTO {
    private int $directory_type;
    private string $template_type;
    private string $title;
    private string $content;
    private string $status;

    public function get_directory_type(): int {
        return $this->directory_type;
    }

    public function set_directory_type( int $directory_type ): self {
        $this->directory_type = $directory_type;
        return $this;
    }

    public function get_template_type(): string {
        return $this->template_type;
    }

    public function set_template_type( string $template_type ): self {
        $this->template_type = $template_type;
        return $this;
    }

    public function get_title(): string {
        return $this->title;
    }

    public function set_title( string $title ): self {
        $this->title = $title;
        return $this;
    }

    public function get_content(): string {
        return $this->content;
    }

    public function set_content( string $content ): self {
        $this->content = $content;
        return $this;
    }

    public function get_status(): string {  
        return $this->status;
    }

    public function set_status( string $status ): self {
        $this->status = $status;
        return $this;
    }
}