<?php

/**
 * Code that connects wordpress to the pattern library.
 * Generally speaking this is simple adapter code that takes the output of built in WP functions and changes it
 * to match what the pattern library is expecting.
 */

class RadicatiWP_Adapter
{
  /**
   * Converts WP pagination array into the format expeted by the Radicati Component LIbrary
   *
   * @param array $pagination - Wordpress pagination array
   * @return array - array in format expect by Radicati Component Library
   */
  static function pagination(array $pagination)
  {
    $ret = [];

    $ret['active'] = $pagination['current'];
    $ret['items'] = [];

    $ret['prev'] = !empty($pagination['prev']['link']) ? $pagination['prev']['link'] : null;
    $ret['next'] = !empty($pagination['next']['link']) ? $pagination['next']['link'] : null;

    foreach ($pagination['pages'] as $page) {
      $new_item = [
        'title' => $page['title']
      ];

      if (!empty($page['link'])) {
        $new_item['link'] = $page['link'];
      }

      $ret['items'][] = $new_item;
    }

    return $ret;
  }
}