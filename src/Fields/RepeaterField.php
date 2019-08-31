<?php

require_once('FieldBase.php');

class RepeaterField extends FieldBase {
  function __construct($label, $name, $parents) {
    parent::__construct($label, $name, $parents);

    $this->setType('repeater');
    $this->setLayout('table');
  }

  /**
   * @param $layout String Should be one of 'table', 'block', or 'row'.
   * @return $this
   */
  function setLayout($layout) {
    $this->field['layout'] = $layout;
    return $this;
  }

  public function addField(FieldBase $field) {
    $this->field['sub_fields'][] = $field->build();
    return $this;
  }

  public function setMin($min) {
    $this->field['min'] = $min;
    return $this;
  }

  public function setMax($max) {
    $this->field['max'] = $max;
    return $this;
  }

  public function setButtonLabel($label) {
    $this->field['button_label'] = $label;
    return $this;
  }

  public function setCollapsed($collapsed) {
    $this->field['collapsed'] = $collapsed;
    return $this;
  }
}