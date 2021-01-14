class ServerState {
  constructor(type, status, port, env) {
    this.type = type;
    this.status = status;
    this.port = port;
    this.env = env;
  }
}

exports.server = new ServerState('SERVER', 'OK', process.env.PORT, process.env.NODE_ENV);
