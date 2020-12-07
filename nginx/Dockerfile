FROM nginx:1.15.0-alpine

RUN rm -f /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

RUN mkdir -p /var/www/html && touch /var/www/html/index.php
