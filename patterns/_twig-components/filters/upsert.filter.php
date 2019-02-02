<?php

/**
 *  Similar to the Twig merge filter, this will allow you to merge a null value, allowing you to use the following
 *  pattern:
 *
 *  {% set classes = ['class1', 'class2']|merge(classes) %}
 *
 *  if classes is full, then a new array will be created that just has class1 and class2.
 */
$filter = new Twig_SimpleFilter('upsert', function ($arr1, $arr2) {
  if ($arr1 instanceof Traversable) {
    $arr1 = iterator_to_array($arr1);
  } elseif (!is_array($arr1)) {
    throw new Twig_Error_Runtime(sprintf('The merge filter only works with arrays or "Traversable", got "%s" as first argument.', gettype($arr1)));
  }
  if ($arr2 instanceof Traversable) {
    $arr2 = iterator_to_array($arr2);
  } else {
    $arr2 = [];
  }
  return array_merge($arr1, $arr2);
});
