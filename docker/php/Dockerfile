FROM php:7.3.9-fpm

RUN apt-get update && apt-get install -y \
        libzip-dev \
        zip \
	&& docker-php-ext-configure zip --with-libzip \
	&& docker-php-ext-install zip \
	&& docker-php-ext-install mysqli

RUN docker-php-ext-install pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/leetcode