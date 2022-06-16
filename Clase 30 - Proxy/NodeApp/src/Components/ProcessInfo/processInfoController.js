const numCPUs = require("os").cpus().length;

const config = require("../../Config")


class ProcessInfo {
    get(req, res) {
        let data = {};
        data.args = process.argv.slice(2).length > 0 ?
                        process.argv.slice(2)
                    :
                        "Sin argumentos";
        data.platform = process.platform;
        data.nodeVersion = process.version;
        data.memory = process.memoryUsage.rss();
        data.path = process.execPath;
        data.numberOfProcess = config.MODE == "FORK" ?
                                    1
                                :
                                    numCPUs + 1;
        data.pid = process.pid;
        data.folder = process.argv[1];

        res.render("processInfo", {data})
    }
}


module.exports = new ProcessInfo;