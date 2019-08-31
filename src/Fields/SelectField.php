<?php

require_once('MultiValueFieldBase.php');

/**
 * Class SelectField
 *
 * Currently doesn't support the AJAX setting.
 */
class SelectField extends MultiValueFieldBase {
  function __construct($label, $name, $parents) {
    parent::__construct($label, $name, $parents);

    $this->setType('select');
    $this->setReturnFormat('array');
    $this->setUI(TRUE);
    $this->allowNull(FALSE);
  }


  function setChoices(array $choices) {
    $this->field['choices'] = $choices;
    return $this;
  }

  function setDefaultValue($value) {
    $value = [
      0 => $value
    ];
    parent::setDefaultValue($value);
    return $this;
  }

  /**
   * @param $format String should be one of 'value', 'array', 'label'
   */
  function setReturnFormat($format) {
    $this->field['return_format'] = $format;
    return $this;
  }
}