import http from 'http'
import logger from 'morgan'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { port } from '../config/settings'
// routes
import apiOficinaRouter from '../routes/oficina.router'
import apiUsuarioRouter from '../routes/usuario.router'
import apiHistoricoRouter from '../routes/historico.router'
import apiGenteRouter from '../routes/gente.router'
import apiFraudeRouter from '../routes/fraude.router'
import apiTipoHitoRouter from '../routes/tipohito.router'
import apiTipoFraudeRouter from '../routes/tipofraude.router'
import apiTipoEventoRouter from '../routes/tipoevento.router'
import apiTipoCierreRouter from '../routes/tipocierre.router'
import apiCargaRouter from '../routes/carga.router'
import apiEstadisticaRouter from '../routes/estadistica.router'

let httpServer

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express()
    httpServer = http.createServer(app)

    // middleware
    app.use(logger('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())
    app.use(cors())

    // routes
    app.use('/api', apiOficinaRouter)
    app.use('/api', apiUsuarioRouter)
    app.use('/api', apiHistoricoRouter)
    app.use('/api', apiGenteRouter)
    app.use('/api', apiFraudeRouter)
    app.use('/api', apiTipoHitoRouter)
    app.use('/api', apiTipoFraudeRouter)
    app.use('/api', apiTipoEventoRouter)
    app.use('/api', apiTipoCierreRouter)
    app.use('/api', apiCargaRouter)
    app.use('/api', apiEstadisticaRouter)

    // server
    httpServer
      .listen(port)
      .on('listening', () => {
        console.log(`Web server listening on conexion: port:${port} `)

        resolve()
      })
      .on('error', (err) => {
        reject(err)
      })
  })
}
module.exports.initialize = initialize

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err)
        return
      }

      resolve()
    })
  })
}
module.exports.close = close
