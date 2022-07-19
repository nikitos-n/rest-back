#!/bin/bash

cp .env.local .env && \
  npm i && \
  npm run docker:up && \
  sleep 5 && \
  npm run db:migrate && \
  npm run db:seed:all && \
  echo "Project installed and ready to run"

