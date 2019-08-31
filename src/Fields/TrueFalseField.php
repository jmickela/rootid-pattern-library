<?php

require_once('FieldBase.php');

class TrueFalseField extends FieldBase {

  public function __construct($label, $name, $parents) {
    parent::__construct($label, $name, $parents);
    $this->setType('true_false');
    $this->setDefaultValue(TRUE);
    $this->setUI(TRUE);
  }

  function setOnText($onText) {
    $this->field['ui_on_text'] = $onText;
    return $this;
  }

  function setOffText($offText) {
    $this->field['ui_off_text'] = $offText;
    return $this;
  }
}