const numCPUs = require("os").cpus().length;


module.exports = {
  apps : [
    {
      name: "ServerFork",
      script: "src/app.js",
      watch: true,
      env: {
        "PORT": 8080
      }
    },

    // Comentar para hacer la parte 2 de Nginx, para que no utilice el puerto 8081 como balanceador
    {
      name: "ServerCluster",
      script: "src/app.js",
      watch: true,
      instances: numCPUs, //En ecosystem no funciona max
      env: {
        "PORT": 8081
      }
    },


    // Descomentar para realizar la parte 2 de Nginx
    // {
    //   name: "ServerFork8082",
    //   script: "src/app.js",
    //   watch: true,
    //   env: {
    //     "PORT": 8082
    //   }
    // },
    // {
    //   name: "ServerFork8083",
    //   script: "src/app.js",
    //   watch: true,
    //   env: {
    //     "PORT": 8083
    //   }
    // },
    // {
    //   name: "ServerFork8084",
    //   script: "src/app.js",
    //   watch: true,
    //   env: {
    //     "PORT": 8084
    //   }
    // },
    // {
    //   name: "ServerFork8085",
    //   script: "src/app.js",
    //   watch: true,
    //   env: {
    //     "PORT": 8085
    //   }
    // }
  ]
}
