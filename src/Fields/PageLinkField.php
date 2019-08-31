<?php

require_once('MultiValueFieldBase.php');

class PageLinkField extends MultiValueFieldBase {
  public function __construct($label, $name, $parents) {
    parent::__construct($label, $name, $parents);

    $this->setType('page_link');
    $this->allowArchives(FALSE);
  }

  /**
   * TODO: implement post type filter!
   *
   * @param $types
   * @return $this
   */
  function setPostTypes($types) {
    return $this;
  }

  function allowArchives($allow) {
    $this->field['allow_archives'] = $allow;
    return $this;
  }
}