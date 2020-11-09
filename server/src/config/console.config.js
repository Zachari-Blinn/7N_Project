function Server_State(type, status, port, env) {
    this.type = type;
    this.status = status;
    this.port = port;
    this.env = env;
}

exports.server = new Server_State("SERVER", "OK", process.env.PORT, process.env.NODE_ENV);