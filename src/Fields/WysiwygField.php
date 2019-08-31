<?php

require_once('FieldBase.php');

class WYSIWYGField extends FieldBase {
  function __construct($label, $name, $parents) {
    parent::__construct($label, $name, $parents);

    $this->setType('wysiwyg');
    $this
      ->setToolbarType('basic')
      ->setAllowUploads(FALSE);

  }

  /**
   * @param $type should be either 'full' or 'basic'
   * @return $this
   */
  function setToolbarType($type) {
    $this->field['toolbar'] = $type;
    return $this;
  }

  function setAllowUploads($allow) {
    $this->field['media_upload'] = $allow;
    return $this;
  }
}