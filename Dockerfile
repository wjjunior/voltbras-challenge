FROM node:12

WORKDIR /usr/src/voltbras-challenge/

COPY ./package.json /usr/src/voltbras-challenge/
COPY ./package-lock.json /usr/src/voltbras-challenge/

RUN npm install

COPY . .

EXPOSE 4000

CMD npm run dev