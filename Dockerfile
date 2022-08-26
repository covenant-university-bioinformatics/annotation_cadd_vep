FROM ubuntu:18.04 
ENV CI=true
ENV PIP_IGNORE_INSTALLED=0

WORKDIR /app

## install R 
## to stop interactve  input tzdata (timezone)
ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Africa/Lagos

RUN  apt-get update && apt-get -y install build-essential   r-base r-base-dev perl wget curl rsync tar make perl-base git 
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


COPY scripts/script.sh ./scripts/

#RUN apt-get update &&  apt-get install -y dos2unix
RUN apt-get update && apt-get -y full-upgrade && apt-get -y install aptitude # && apt-get install --fix-missing	
#RUN apt-get install -qq --assume-yes  dos2unix
RUN aptitude install -y dos2unix
RUN dos2unix /app/scripts/script.sh
RUN chmod 775 /app/scripts/script.sh

#ENTRYPOINT ["bash", "/app/scripts.sh"]
CMD ["bash", "/app/scripts/script.sh"]


