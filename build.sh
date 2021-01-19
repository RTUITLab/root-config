#!/bin/bash

# Building Projects
cd ITLab-Projects-Front;

npm run build;

cd ..;

# Building Front
cd 'ITLab-Front';

npm run build

cd ..;

# Building Single SPA
npm run build
