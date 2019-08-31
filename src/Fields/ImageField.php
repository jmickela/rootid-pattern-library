<?php

require_once('FieldBase.php');

/**
 * Class ImageField
 *
 * 'return_format' => 'array',
'preview_size' => 'medium',
'library' => 'all',
'min_width' => '',
'min_height' => '',
'min_size' => '',
'max_width' => '',
'max_height' => '',
'max_size' => '',
'mime_types' => '',
 */
class ImageField extends FieldBase {
  public function __construct($label, $name, $parents) {
    parent::__construct($label, $name, $parents);
    $this
      ->setType('image')
      ->setReturnFormat('array')
      ->setPreviewSize('medium');


  }

  function setReturnFormat($format) {
    $this->field['return_format'] = $format;
    return $this;
  }

  function setPreviewSize($imageStyle) {
    $this->field['preview_size'] = $imageStyle;
    return $this;
  }
}