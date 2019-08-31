<?php

require_once('FieldBase.php');

class GroupField extends FieldBase {

  public function __construct($label, $name, $parents) {
    parent::__construct($label, $name, $parents);

    $this->setType('group');

    $this->field['title'] = $label;

    $this->field['sub_fields'] = [];
  }

  public function addField(FieldBase $field) {
    $this->field['sub_fields'][] = $field->build();
    return $this;
  }

//  public function build() {
//    return $this->field;
//  }
}