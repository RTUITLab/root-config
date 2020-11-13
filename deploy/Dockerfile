FROM nginx

EXPOSE 9000

COPY fillConfig.sh /scripts/fillConfig.sh
RUN chmod +x /scripts/fillConfig.sh

COPY nginx.conf /etc/nginx/nginx.conf

COPY /ITLab-Root-Front /app

CMD /scripts/fillConfig.sh > /app/config.json && cat /app/config.json && nginx