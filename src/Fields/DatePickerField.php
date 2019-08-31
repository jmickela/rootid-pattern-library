<?php

require_once('FieldBase.php');

class DatePickerField extends FieldBase {
  function __construct($label, $name, $parents) {
    parent::__construct($label, $name, $parents);

    $this->setType('date_picker');
    $this->setDisplayFormat('F d, Y');
    $this->setReturnFormat('m/d/Y');
  }

  function setDisplayFormat($format) {
    $this->field['display_format'] = $format;
  }

  function setReturnFormat($format) {
    $this->field['return_format'] = $format;
  }
}