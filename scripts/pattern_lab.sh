#!/bin/bash

# If Pattern lab is already installed, remove it.
rm -rf .pattern-lab


# Install Pattern Lab
composer create-project -n pattern-lab/edition-twig-standard .pattern-lab
cd .pattern-lab

# Install Twig Namespaes plugin
composer require evanlovely/plugin-twig-namespaces

# Enable Twig Debugging
sed -i -e "s/bug: false/bug: true/g" config/config.yml

cd ..

# Delete the default source directory
rm -rf .pattern-lab/source

# Symlink our components directory to the source location we just deleted
ln -s ../patterns/ .pattern-lab/source