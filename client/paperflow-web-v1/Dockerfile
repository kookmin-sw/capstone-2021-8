FROM node:12.19.0

RUN mkdir /paperflow_web
WORKDIR /paperflow_web

ENV PATH /paperflow_web/node_modules/.bin:$PATH

ADD ./ /paperflow_web/

RUN chmod 755 /paperflow_web/start
EXPOSE 8088

ENTRYPOINT ["/paperflow_web/start"]
