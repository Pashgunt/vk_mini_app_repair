FROM php:8.1.0-fpm

RUN apt-get update && apt-get install -y \
        libzip-dev \
        zip \
		ssh sshpass \
	&& docker-php-ext-configure zip\
	&& docker-php-ext-install zip \
	&& docker-php-ext-install mysqli \
	&& docker-php-ext-install pdo pdo_mysql
