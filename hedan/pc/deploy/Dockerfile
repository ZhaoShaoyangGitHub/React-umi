FROM daocloud.io/nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx-server.conf /etc/nginx/conf.d/default.conf
COPY ./collect_env.sh /usr/share/nginx
RUN chmod 777 /usr/share/nginx/collect_env.sh
COPY ./dist /usr/share/nginx/html
CMD ["/bin/sh", "-c", "/usr/share/nginx/collect_env.sh"]