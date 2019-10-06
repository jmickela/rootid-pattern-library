<?php
/**
 * @file
 * Add "bem" function for Pattern Lab
 * 
 * Use: {{ bem('element', ['modifier', 'classes'], 'block', ['extra', 'classes']) }}
 * 
 * Example:
 * <h1 {{ bem('title', ['small', 'red'], 'card', ['js-click', 'something-else']) }}>
 * 
 * Creates:
 * <h1 class="card__title card__title--small card__title--red js-click something-else">
 * 
 */

$function = new Twig_SimpleFunction('bem', function ($context, $base_class, $modifiers = array(), $blockname = '', $extra = array()) {
    $classes = [];
    // If using a blockname to override default class.
    if ($blockname) {
        // Set blockname class.
        $classes[] = $blockname . '__' . $base_class;
        // Set blockname--modifier classes for each modifier.
        if (isset($modifiers) && is_array($modifiers)) {
            foreach ($modifiers as $modifier) {
                $classes[] = $blockname . '__' . $base_class . '--' . $modifier;
            };
        }
    }
    // If not overriding base class.
    else {
        // Set base class.
        $classes[] = $base_class;
        // Set base--modifier class for each modifier.
        if (isset($modifiers) && is_array($modifiers)) {
            foreach ($modifiers as $modifier) {
                if($base_class != '')
                    $classes[] = $base_class . '--' . $modifier;
                else
                    $classes[] = $modifier;
            };
        }
    }
    // If extra non-BEM classes are added.
    if (isset($extra) && is_array($extra)) {
        foreach ($extra as $extra_class) {
            $classes[] = $extra_class;
        };
    }

    if(!empty($classes)) {
        $attributes = 'class="' . implode(' ', $classes) . '"';
        return $attributes;
    } else {
        return null;
    }

}, array('needs_context' => true, 'is_safe' => array('html')));