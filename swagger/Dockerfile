FROM node:latest

WORKDIR /swagger-node

ENV PORT=8080
ENV URL=http://nightmare:9999/atms?address=
ENV APIKEY=1234

RUN npm install -g swagger
# RUN swagger project create -f express atms

# Make everything available for start

WORKDIR /swagger-node/atms

ADD /atms/. .

RUN npm install

CMD swagger project start 