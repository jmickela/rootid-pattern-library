<?php


/**
 * Class FieldGroup
 *
 * This is the top level set of fields that is attached to a post type, taxonomy term page, custom post type....
 *
 * This operates substantially differently and shouldn't be confused with the GroupField, which is a field type in ACF.
 *
 */
class FieldGroup {
  protected $field = [];

  public function __construct($label, $name) {
    $this->field['title'] = $label;
    $this->field['fields'] = [];
  }

  public function addField(FieldBase $field) {
    $this->field['fields'][] = $field->build();
    return $this;
  }

  public function addLocation($location) {
    if(empty($this->field['location']) || !array($this->field['location']))
      $this->field['location'] = [];

    $this->field['location'][] = $location;

    return $this;
  }

  public function build() {
    acf_add_local_field_group($this->field);
  }
}