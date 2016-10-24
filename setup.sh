#!/bin/bash


if [  -d "Griffins-Reports" ]; then
    rm -rf Griffins-Reports
fi
mkdir Griffins-Reports


p="`pwd`/Griffins-Main/libs/"
js="${p}System.js"
otherjs="${p}System_bak.js"

shellp="`pwd`/Griffins-Main/libs/shells/"

sed -e "s#scriptPath:.*#scriptPath:\"${shellp}\",#" $js > $otherjs

mv $otherjs  $js

resultp="`pwd`/Griffins-Reports/"

sed -e "s#resultPath:.*#resultPath:\"${resultp}\",#" $js > $otherjs
mv $otherjs  $js

runtemp="`pwd`/Griffins-Tmp/"
sed -e "s#screenPath:.*#screenPath:\"${runtemp}\",#" $js > $otherjs
mv $otherjs  $js

echo "setUp finished!!"
