<?php
/**
    Expands an array of key/value attribute pairs into key="value" text
*/

$function = new Twig_SimpleFunction('expand', function ($attributes) {
    $output = "";

    if(empty($attributes))
        return null;

    foreach($attributes as $key => $value) {
        $output .= " {$key}='{$value}'";
    }

    return $output;
}, array('is_safe' => array('html')));