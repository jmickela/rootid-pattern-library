<?php

require_once(__DIR__ . '/../fields.php');

class Button extends GroupField {
  function __construct($label, $name, $parents=[]) {
    parent::__construct($label, $name, $parents);

    $text = new TextField('Label', 'content', $parents);
    $pageLink = new PageLinkField('Page', 'internal_page', $parents);
    $urlField = new URLField('External URL', 'external_url', $parents);
    $internalExternalSwitch = new TrueFalseField('Link Type', 'link_type', $parents);

    $internalExternalSwitch
      ->setOnText('Internal Page')
      ->setOffText('External URL');

    $urlField->add_condition($internalExternalSwitch->getKey(), '==', 0);
    $pageLink->add_condition($internalExternalSwitch->getKey(), '==', 1);

    $this
      ->addField($text)
      ->addField($internalExternalSwitch)
      ->addField($pageLink)
      ->addField($urlField);
  }

  static function parse($field) {
    // If there's no button text and no url to display, then return null.
    // Note: This will no return null unless both conditions are met, if there's a URL but no button text, it will
    // still process this field.
    if(empty($field['content']) && (empty($field['external_url']) || empty($field['internal_page'])))
      return NULL;

    if($field['link_type'] == TRUE) {
      $field['href'] = $field['internal_page'];
    } else {
      $field['href'] = $field['external_url'];
    }

    return $field;
  }
}