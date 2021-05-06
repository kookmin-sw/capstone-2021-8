FROM python:3.6

ENV PYTHONUNBUFFERED 1

RUN mkdir /paperflow_server
WORKDIR /paperflow_server

ADD ./ /paperflow_server/

RUN pip install -r /paperflow_server/requirements.txt
RUN chmod 755 /paperflow_server/start
EXPOSE 8000

ENTRYPOINT ["/paperflow_server/start"]
