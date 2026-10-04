#!/bin/bash
# Runs the Roshdah African Market website (dev server) on this VM.
# Requires the postgres in /var/tmp/roshdah-db to be running (see start-db.sh there).
# Launch detached: setsid bash start.sh > dev.log 2>&1 < /dev/null &
cd /home/hatch/workspace/RoshdahAfricanMarketWebsite
export DATABASE_URL=postgresql://pguser:postgres@127.0.0.1:5432/roshdah
export PORT=5000
export NODE_ENV=development
exec npm run dev
