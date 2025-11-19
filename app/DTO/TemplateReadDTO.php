<?php

namespace DirectoristGutenberg\App\DTO;

defined( "ABSPATH" ) || exit;

use DirectoristGutenberg\WpMVC\DTO\DTO;

class TemplateReadDTO extends DTO {
    private int $per_page = 10;
    private int $page = 1;

    private ?string $title = null;
    private ?string $template_type = null;
    private ?int $directory_type = null;
    private ?array $status = null;
    private string $order_by = 'latest';

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

    public function get_title(): ?string {
        return $this->title;
    }

    public function set_title( ?string $title ): self {
        $this->title = $title;
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

    public function get_status(): ?array {
        return $this->status;
    }

    public function set_status( ?array $status ): self {
        $this->status = $status;
        return $this;
    }

    public function get_order_by(): string {
        return $this->order_by;
    }

    public function set_order_by( string $order_by ): self {
        $this->order_by = $order_by;
        return $this;
    }
}