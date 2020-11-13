#!/bin/bash
envs=($(printenv | grep '^FRONT_ROOT_'))
function join { local IFS="$1"; shift; echo "$*"; }

jsonProps=()

for i in "${envs[@]}"
do
    key=${i%=*}
    keyWithoutPrefix=${key#*FRONT_ROOT_}
    jsonProps+=("\"${keyWithoutPrefix,,}\":\"${i#*=}\"")
done
output="{$(join , ${jsonProps[*]})}"
echo $output