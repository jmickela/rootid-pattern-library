<?php

require_once(__DIR__ .'/../fields.php');

class LandingPageHero extends GroupField {

  function __construct($name, $key, $parents=[]) {
    parent::__construct($name, $key, $parents);
    $parents[] = $key;

    $text = new TextField('Title', 'title', $parents);
    $image = new ImageField('Image', 'image', $parents);

    $this
      ->addField($text)
      ->addField($image);
  }

  static function parse($field, $imageStyle, $sizes='100vw') {
    $field['image'] = RadicatiWP_Adapter::getImageData($field['image']['ID'], $imageStyle);
    $field['image']['sizes'] = $sizes;
    return $field;
  }
}