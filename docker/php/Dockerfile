FROM php:8-fpm

LABEL maintainer="mohammed_hs55@yahoo.com"

# Install dependencies
RUN apt-get update && apt-get install -y \
    libonig-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    zlib1g-dev \
    libxml2-dev \
    libzip-dev \
    locales \
    redis-server \
    git \
    curl

# redis config
COPY redis.conf /etc/redis/redis.conf.default
COPY redis.conf /etc/redis/redis.conf

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install extensions
RUN docker-php-ext-install pdo_mysql mysqli mbstring zip exif pcntl

# install supervisor
# RUN apt-get update && apk add --no-cache supervisor

# enable redis
RUN pecl install -o -f redis \
&&  rm -rf /tmp/pear \
&&  docker-php-ext-enable redis

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
# RUN composer install

# install latest version node-js, npm
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs

#install larave-echo-server
# RUN npm install express socket.io socket.io-client laravel-echo ioredis dotenv --save
# RUN npm install -g laravel-echo-server
# RUN npm install


# install requiremnt that needed to make realtime app
# RUN npm install -g laravel-echo-server
# RUN npm --save laravel-echo socket.io-client
# CMD ["laravel-echo-server init"]
# CMD ["laravel-echo-server start"]
# RUN sysctl vm.overcommit_memory=1

# install supervisor
RUN apt-get update && apt-get install -y supervisor
RUN mkdir -p /var/log/supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 9000
CMD ["/usr/bin/supervisord"]

# Expose port 9000 and start php-fpm server
# EXPOSE 9000
# CMD ["php-fpm"]
