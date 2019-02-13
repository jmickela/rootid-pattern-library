<?php

$filter = new Twig_SimpleFilter('css', function ($string) {
  $string = str_replace(' ', '-', $string);
  $string = preg_replace('~[^\pL\d-]+~u', '', $string);
  return strtolower($string);
});