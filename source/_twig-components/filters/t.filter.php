<?php

$filter = new Twig_SimpleFilter('t', function ($string, $options="") {
  return $string;
});