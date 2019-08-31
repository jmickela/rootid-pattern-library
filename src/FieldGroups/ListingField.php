<?php

use Timber\Timber;

require_once(__DIR__ .'/../fields.php');

/**
 * Class ListingField
 *
 * Pagination does not work on post type objects. It has to be used on page-ish things.
 * you will get a list of the number of possible pages, but the user will get redirected to the original post page
 * if you try to go to another page.
 *
 * If this is essential functionality it is possible to disable this redirect using an action.
 *
 */
class ListingField extends GroupField {

  function __construct($name, $key, $types, $parents=[]) {
    parent::__construct($name, $key, $parents);

    $post_type = new SelectField('Content Types', 'content_types', null);
    $post_type->multiple(TRUE)->setReturnFormat('key')->setChoices($types);

    $choices = [];
    for($i = 1; $i <= 12; $i++)
      $choices[$i] = $i;

    $posts_per_page = new SelectField('Contents Per Page', 'posts_per_page', null);
    $posts_per_page->multiple(FALSE)->setReturnFormat('key')->setChoices($choices);

    $order_by = new SelectField('Order By', 'order_by', null);
    $order_by->setReturnFormat('key')->setChoices([
      'title' => 'Title',
      'date' => 'Date'
    ]);

    $order = new SelectField('Order', 'order', null);
    $order->setReturnFormat('key')->setDefaultValue('ASC')->setChoices([
      'ASC' => 'Ascending',
      'DESC' => 'Descending'
    ]);

    $use_pager = new TrueFalseField('Use Pager', 'use_pager', null);
    $use_pager->setOnText('Use Pager')->setOffText('No Pager');

    $this
      ->addField($post_type)
      ->addField($order_by)
      ->addField($order)
      ->addField($posts_per_page)
      ->addField($use_pager);
  }

  static function parse($field, $paged=TRUE) {
    if($field['use_pager'])
      $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
    else
      $paged = FALSE;

    $args = [
      'posts_per_page' => $field['posts_per_page'],
      'post_type' => $field['content_types'],
      'paged' => $paged,
      'orderby' => $field['order_by'],
      'order' => $field['order'],
      'ignore_sticky_posts' => FALSE,
      'has_password' => FALSE
    ];

    $posts = Timber::get_posts($args);

    if($paged) {
      query_posts($args);
      //get_posts($args);
      $pagination = Timber::get_pagination();
      if($pagination['total'] > 1) {
        $field['pagination'] = RadicatiWP_Adapter::pagination($pagination);
      }
    }

    $field['posts'] = $posts;
    return $field;
  }
}