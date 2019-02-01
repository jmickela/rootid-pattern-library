<?php

/**
 * Code that connects wordpress to the pattern library.
 * Generally speaking this is simple adapter code that takes the output of built in WP functions and changes it
 * to match what the pattern library is expecting.
 */

class RadicatiWP_Adapter
{
  /**
   * Returns a string containing a set of urls and widths, ready to be used as a srcset in an img tag.
   *
   * @param $imageId: WordPress Image Id
   * @param string $size: WordPress Image Size
   * @return String: srcset of image sizes
   */
  static function getImageSrcSet($imageId, $size = 'medium') {
    return wp_get_attachment_image_srcset($imageId, $size);
  }

  /**
   * @param string $size
   * @param null $post_id
   * @return array|null
   */
  static function getFeaturedImageData($size = 'medium', $post_id = null) {
    return RadicatiWP_Adapter::getImageData(get_post_thumbnail_id($post_id), $size);
  }

  /**
   * @param $imageId: WordPress Image Id
   * @param string $size
   * @return array|null
   */
  static function getImageData($imageId, $size = 'medium') {
    $image = [];

    $src = wp_get_attachment_image_src($imageId, $size, false);
    if($src == null) {
      return null;
    }

    $image['src'] = $src[0];
    $image['srcset'] = RadicatiWP_Adapter::getImageSrcSet($imageId, $size);
    $image['alt'] = get_post_meta($imageId, '_wp_attachment_image_alt', true);

    return $image;
  }


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