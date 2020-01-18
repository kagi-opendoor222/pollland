rm -f /backend/tmp/pids/server.pid
bundle exec rails s -b '0.0.0.0'  --environment production