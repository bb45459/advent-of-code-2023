#!/bin/sh

FIRST_ARGUMENT="$1"

# create day directory if not exists
[ -d ./src/day$FIRST_ARGUMENT ] || mkdir ./src/day$FIRST_ARGUMENT

# copy template and replace day placeholder with number
cat ./day.template.ts | sed "s/__DAY__/$FIRST_ARGUMENT/" >> ./src/day$FIRST_ARGUMENT/day.$FIRST_ARGUMENT.ts