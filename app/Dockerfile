FROM ubuntu:18.04

ENV CI=true
ENV PIP_IGNORE_INSTALLED=0

WORKDIR /app

## install R
## to stop interactve  input tzdata (timezone)
ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Africa/Lagos

RUN apt-get update && apt-get -y install build-essential   r-base r-base-dev perl wget curl rsync tar make perl-base git
# libbio-db-hts-perl libbio-db-hts-perl
RUN echo "source export PERL_MM_USE_DEFAULT=1 "> ~/.bashrc
SHELL ["/bin/bash", "-c"]
RUN cpan inc::latest
SHELL ["/bin/bash", "-c"]
RUN  cpan Archive::Zip
#SHELL ["/bin/bash", "-c"]
#RUN cpan DBD::mysql
SHELL ["/bin/bash", "-c"]
RUN  cpan DBI
SHELL ["/bin/bash", "-c"]
RUN cpan
SHELL ["/bin/bash", "-c"]
RUN cpan Module::Build
SHELL ["/bin/bash", "-c"]
#RUN cpan  Bio::DB:HTS
RUN apt-get -y install curl zip unzip  libdbd-mysql-perl
RUN apt-get -y install tabix


#install node and npm
ENV NODE_VERSION=16.13.0
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

COPY package.json ./

RUN npm install

COPY ./ ./

#remove windows line endings
RUN apt-get install -y dos2unix
RUN dos2unix pipeline_scripts/pipeline.sh
RUN chmod 775 pipeline_scripts/pipeline.sh

RUN npm run build

CMD [ "npm", "run", "start:prod" ]
