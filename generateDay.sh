#!/bin/sh

FIRST_ARGUMENT="$1"

cat ./day.template.ts | sed "s/__DAY__/$FIRST_ARGUMENT/" >> ./src/day$FIRST_ARGUMENT/day.$FIRST_ARGUMENT.ts