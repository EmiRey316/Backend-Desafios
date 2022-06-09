class ProcessInfo {
    get(req, res) {
        let data = {};
        data.args = process.argv.slice(2);
        data.platform = process.platform;
        data.nodeVersion = process.version;
        data.memory = process.memoryUsage.rss();
        data.path = process.execPath;
        data.pid = process.pid;
        data.folder = process.argv[1];

        res.render("processInfo", {data})
    }
}


module.exports = new ProcessInfo;