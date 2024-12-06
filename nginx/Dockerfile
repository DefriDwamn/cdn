FROM nginx/nginx-prometheus-exporter:latest

COPY nginx.conf /etc/nginx/nginx.conf
COPY content /usr/share/nginx/html/content

EXPOSE 80 9113

CMD ["nginx-prometheus-exporter", "-nginx.scrape-uri=http://localhost/metrics"]
