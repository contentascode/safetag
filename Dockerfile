From node:8

RUN apt-get update -qq && apt-get -qq -y install libssl-dev libcurl4-openssl-dev build-essential
RUN rm -rf /var/lib/apt/lists/*

RUN curl -OL https://github.com/jgm/pandoc/releases/download/1.17.1/pandoc-1.17.1-2-amd64.deb
RUN dpkg -i pandoc-1.17.1-2-amd64.deb

RUN npm install npm@latest
RUN rm -rf /usr/local/lib/node_modules/npm
RUN mv node_modules/npm /usr/local/lib/node_modules/npm

RUN npm -g config set user root
RUN npm i -g docsmith@beta

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package-lock.json content.yml /usr/src/app/
RUN npm i -g
RUN npm i

WORKDIR /usr/src
RUN mkdir workspace && cd workspace
WORKDIR /usr/src/workspace
RUN DEBUG=* safetag init --non-interactive
# RUN ls -la /usr/src/workspace/@safetag
# Deals with postinstall script not running under root
RUN cd ~/.content/packages/safetag-toolkit && rm -rf node_modules && npm install --unsafe-perm
RUN git clone https://github.com/SAFETAG/SAFETAG

# Fix missing symlinks manually
RUN safetag run --clean --no-watch --source $(pwd)/SAFETAG/en migrate

# Link migrated content as content packages (use force for activities since for now there is a default activities package in safetag-toolkit)
RUN safetag link @safetag/.activities:~/.content/build/@safetag/migrate/activities --force
RUN safetag link @safetag/.references:~/.content/build/@safetag/migrate/references --force
RUN safetag link @safetag/.methods:~/.content/build/@safetag/migrate/methods --force
RUN safetag link @safetag/.images:~/.content/build/@safetag/migrate/images --force
RUN safetag link @safetag/.document_matter:~/.content/build/@safetag/migrate/document_matter --force
RUN safetag link @safetag/guide/index.md:~/.content/build/@safetag/migrate/index.guide.md --force

# Build website
RUN safetag start --clean --no-watch --baseurl /safetag/@safetag/toolkit toolkit
RUN safetag start --clean --no-watch --baseurl /safetag/@safetag/guide guide

CMD ["apprentice", "config"]
