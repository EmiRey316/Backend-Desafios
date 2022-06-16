const numCPUs = require("os").cpus().length;


module.exports = {
  apps : [{
      name: "ServerFork",
      script: "src/app.js",
      watch: true,
      env: {
        "PORT": 8080
      }
  },
  {
    name: "ServerCluster",
    script: "src/app.js",
    watch: true,
    instances: numCPUs, //En ecosystem no funciona max
    env: {
      "PORT": 8081
    }
  }]
}
