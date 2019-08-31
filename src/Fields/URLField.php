<?php

require_once('FieldBase.php');

class URLField extends FieldBase {
  public function __construct($label, $name, $parents) {
    parent::__construct($label, $name, $parents);
    $this->setType('url');
  }
}