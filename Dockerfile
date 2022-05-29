FROM nginx:latest
 
RUN mkdir /dist
COPY ./dist /dist/vue-hello-world
COPY ./vhost.nginx.conf /
 
CMD envsubst < /vhost.nginx.conf > /etc/nginx/nginx.conf \
	&& cat /etc/nginx/nginx.conf \
	&& nginx -g 'daemon off;'