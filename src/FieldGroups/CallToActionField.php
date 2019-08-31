<?php

require_once(__DIR__ .'/../fields.php');
require_once('ButtonField.php');

class CallToAction extends GroupField {

  function __construct($name, $key, $parents=[]) {
    parent::__construct($name, $key, $parents);

    $parents[] = $key;

    $this->setClass('call-to-action');

    $text = new TextField('Title', 'title', $parents);
    $text->placeholder('test')->instructions('Enter Some kind of title here.');
    $subtitle = new TextField('Sub-title', 'sub_title', $parents);
    $button = new Button('Button', 'button', $parents);
    $image = new ImageField('Image', 'image', $parents);

    $this
      ->addField($text)
      ->addField($subtitle)
      ->addField($button)
      ->addField($image);
  }

  static function parse($field, $imageStyle, $sizes='100vw') {
    $field['image'] = RadicatiWP_Adapter::getImageData($field['image']['ID'], $imageStyle);
    $field['button'] = Button::parse($field['button']);
    return $field;
  }
}