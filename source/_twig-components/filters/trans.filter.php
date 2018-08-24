<?php

$filter = new Twig_SimpleFilter('trans', function ($string, $options="") {
  return $string;
});