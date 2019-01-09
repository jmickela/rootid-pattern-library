#!/bin/bash

rm -rf .pattern-lab

composer create-project -n pattern-lab/edition-twig-standard .pattern-lab
cd .pattern-lab
composer require evanlovely/plugin-twig-namespaces

# Delete the default source directory
rm -rf source

# Symlink our components directory to the source location we just deleted
ln -s ../patterns/ source