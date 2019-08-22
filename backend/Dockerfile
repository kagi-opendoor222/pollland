FROM ruby:2.6.3

RUN apt-get update -qq && apt-get install -y \
    build-essential \
    nodejs 
RUN gem install bundler

WORKDIR /backend

COPY Gemfile Gemfile.lock ./

RUN bundle install

COPY ./ ./