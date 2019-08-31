<?php

class FieldBase {
  protected $field = [];

  protected function __construct($label, $name, $parents) {
    $this->field['label'] = $label;
    $this->field['key'] = $this->generate_key($name, $parents);
    $this->field['name'] = $this->generate_name($name, $parents);
  }

  public function getKey() {
    return $this->field['key'];
  }

  public function build() {
    return $this->field;
  }

  protected function setType($type) {
    $this->field['type'] = $type;
    return $this;
  }

  function generate_key($name, $parents=[]) {
    if(is_array($parents))
      $parent_key = implode('_', $parents);
    else
      $parent_key = $parents;
    //return "field_{$parent_key}_{$name}";

    return "field_{$name}";
  }

  function generate_name($name, $parents=[]) {
    if(is_array($parents))
      $parent_key = implode('_', $parents);
    else
      $parent_key = $parents;
    //return "{$parent_key}_{$name}";
    return $name;
  }

  /**
   * @param $value mixed: each field type needs different types of values, pass in something that fits the field you're working with.
   * @return $this
   */
  function setDefaultValue($value) {
    $this->field['default_value'] = $value;
    return $this;
  }

  function placeholder($placeholder_text) {
    $this->field['placeholder'] = $placeholder_text;
    return $this;
  }

  function instructions($instructions_text) {
    $this->field['instructions'] = $instructions_text;
    return $this;
  }

  function required($is_required) {
    $this->field['required'] = $is_required;
    return $this;
  }

  function allowNull($allow) {
    $this->field['allow_null'] = $allow;
    return $this;
  }

  function setClass($className) {
    if( empty($this->field['wrapper']))
      $this->field['wrapper'] = [];

    $this->field['wrapper']['class'] = $className;
    return $this;
  }

  function setUI($stylizedUI) {
    $this->field['ui'] = $stylizedUI;
    return $this;
  }

  function setID($id) {
    if( empty($this->field['wrapper']))
      $this->field['wrapper'] = [];

    $this->field['wrapper']['id'] = $id;
    return $this;
  }



  function add_condition($condition_field, $operator, $value) {
    if(empty($this->field['conditional_logic']) || !array($this->field['conditional_logic'])) {
      $this->field['conditional_logic'] = [];
    }

    $condition = NULL;

    if($operator == '==') {
      $condition = [
        [
          'field' => $condition_field,
          'operator' => $operator,
          'value' => $value
        ]
      ];
    }

    $this->field['conditional_logic'][] = $condition;

    return $this;
  }
}