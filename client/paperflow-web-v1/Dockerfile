FROM node:12.19.0

RUN mkdir /paperflow_web
WORKDIR /paperflow_web

ENV PATH /paperflow_web/node_modules/.bin:$PATH

ADD ./ /paperflow_web/
RUN npm install

RUN chmod 755 /paperflow_web/start
EXPOSE 8080

ENTRYPOINT ["/paperflow_web/start"]
