<?php

namespace DirectoristGutenberg\App\DTO;

defined( "ABSPATH" ) || exit;

use DirectoristGutenberg\WpMVC\DTO\DTO;

class TemplateReadDTO extends DTO {
    private int $per_page = 10;
    private int $page = 1;
    private ?string $template_type = null;
    private ?int $directory_type = null;

    public function get_per_page(): int {
        return $this->per_page;
    }

    public function set_per_page( int $per_page ): self {
        $this->per_page = $per_page;
        return $this;
    }

    public function get_page(): int {
        return $this->page;
    }

    public function set_page( int $page ): self {
        $this->page = $page;
        return $this;
    }

    public function get_template_type(): ?string {
        return $this->template_type;
    }

    public function set_template_type( ?string $template_type ): self {
        $this->template_type = $template_type;
        return $this;
    }

    public function get_directory_type(): ?int {
        return $this->directory_type;
    }

    public function set_directory_type( ?int $directory_type ): self {
        $this->directory_type = $directory_type;
        return $this;
    }
}