#!/usr/bin/env node
/**
 * Module dependencies.
 */
import debug from "debug";
import http from "http";
import app from "../app";
import { Server } from "socket.io";

let notes = [];
let users = [];

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
};

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || "4200");
app.set("port", port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.log(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.log(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
};

/**
 * socket.io
 */
const io = new Server(server);

io.on("connection", (socket) => {
  //io.to(socket.id).emit('server:loadNotes', notes)
  // socket.on('client:addUser', (userID) => {
  //   addUser(userID, socket.id)
  //   io.emit('server:users', users)
  // });
  socket.on("client:newNote", (note) => {
    addNote(note)
    io.emit('server:newNote', note)
  });
  // socket.on("client:newNoteTo", (note) => {
  //   const user = getUser(note.receiverId)
  //   addNote(note)
  //   io.to(user.socketId).emit("server:newNote", note)
  // });
  // socket.on("disconnect", () => {
  //   delUser(socket.id)
  //   io.emit('server:users', users)
  // });
});

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * helpers
 */
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
}
const delUser = (socketId) => {
  users = users.filter(user => user.socketId !== socketId)
}
const getUser = (userId) => {
  return users.find(user => user.userId === userId)
}
const addNote = (data) => {
  notes.push(data);
}
