FROM nginx:1.27-alpine

ARG DOMAIN=urfu.localhost

# Самоподписанный сертификат генерируется при сборке образа,
# поэтому приватный ключ не хранится в репозитории
RUN apk add --no-cache openssl \
    && mkdir -p /etc/nginx/certs \
    && openssl req -x509 -nodes -newkey rsa:2048 -days 365 \
        -keyout /etc/nginx/certs/server.key \
        -out /etc/nginx/certs/server.crt \
        -subj "/CN=${DOMAIN}" \
        -addext "subjectAltName=DNS:${DOMAIN},DNS:localhost,IP:127.0.0.1"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html grid.html flex.html styles.css /usr/share/nginx/html/

EXPOSE 80 443
