#!/bin/bash

# Building Projects
cd ITLab-Projects-Front;

npm run build;

cd ..;

# Building Front
cd 'ITLab-Front';

npm run build
ls ./deploy/ITLab-Front/js -1 | grep -E "docker-[[:alnum:]]*\.sh" > ./deploy/ITLab-Front/app.txt;

cd ..;

# Building Single SPA
npm run build
