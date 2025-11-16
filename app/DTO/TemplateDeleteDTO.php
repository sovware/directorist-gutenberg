<?php

namespace DirectoristGutenberg\App\DTO;

defined( "ABSPATH" ) || exit;

use DirectoristGutenberg\WpMVC\DTO\DTO;

class TemplateDeleteDTO extends DTO {
    private int $directory_type;
    private ?string $template_type = null;
    private ?array $status = null;

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

    public function get_status(): ?array {
        return $this->status;
    }

    public function set_status( ?array $status ): self {
        $this->status = $status;
        return $this;
    }
}