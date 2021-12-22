#!/bin/bash
if [ -z ${APPLICATION_FRONT_END+x} ];
then
  echo 'http://localhost:3000';
else
  echo $APPLICATION_FRONT_END;
fi
