#!/bin/bash

rm -r server/public/
mkdir server/public
rm -r client/dist/
mkdir client/dist/

cd client
npm run build
cd ..
cp -R client/dist/* server/public/