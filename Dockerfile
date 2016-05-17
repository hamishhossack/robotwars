FROM node:4.4.2

ENV NODE_ENV $env

RUN npm i -g gulp

ADD . /opt/applications/robotwars-app

WORKDIR /opt/applications/robotwars-app

RUN npm install

EXPOSE 3000

CMD /usr/local/bin/gulp serve