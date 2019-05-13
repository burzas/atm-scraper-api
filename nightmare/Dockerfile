FROM beneaththeink/node-xvfb

ENV PORT=9999

WORKDIR /home/scraper

# Install Node packages
ADD package.json /home/scraper/package.json

# Install packages
RUN npm install --production && mkdir error

# Make everything available for start
ADD . /home/scraper

EXPOSE 12080

CMD xvfb-run --server-args="-screen 0 1024x768x24"  node run.js