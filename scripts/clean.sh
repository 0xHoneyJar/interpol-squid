#!/bin/bash
npx squid-typeorm-codegen
sqd down
sqd up
npm run build
rm -r db/migrations
npx squid-typeorm-migration generate
npx squid-typeorm-migration apply
sqd down
sqd deploy --hard-reset