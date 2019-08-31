<?php

require_once('FieldBase.php');

class MultiValueFieldBase extends FieldBase {
  function __construct($label, $name, $parents) {
    parent::__construct($label, $name, $parents);
    $this->multiple(FALSE);
  }

  function multiple($allow) {
    $this->field['multiple'] = $allow;
    return $this;
  }
}