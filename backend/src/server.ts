import AppServer from './AppServer'

const port: string = process.env.PORT || '8080'
const app = new AppServer(port)
app.start()