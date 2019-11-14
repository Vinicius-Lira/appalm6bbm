module.exports = {
    apps : [
    {
        name        : "AppAlm6bbm",
        script      : "./bin/server.js",
        watch       : true,
        env: {
            "NODE_ENV": "development",
        },
        env_production : {
            "NODE_PORT": "8080",
            "NODE_ENV": "production"
        }
    },
    {
        name       : "api-app",
        script     : "./api.js",
        instances  : 4,
        exec_mode  : "cluster"
    }]
}