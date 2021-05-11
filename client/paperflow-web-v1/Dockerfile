FROM node:12.19.0

# development || production
ENV NODE_ENV production
RUN export NODE_ENV

RUN mkdir /paperflow_web
WORKDIR /paperflow_web

ENV PATH /paperflow_web/node_modules/.bin:$PATH

ADD ./ /paperflow_web/

RUN rm -rf ./node_modules
RUN npm install
RUN npm run postinstall

RUN chmod 755 /paperflow_web/start
EXPOSE 8088

ENTRYPOINT ["/paperflow_web/start"]
