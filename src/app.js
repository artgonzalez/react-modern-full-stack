import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { postsRoutes } from './routes/posts.js'
import bodyParser from 'body-parser'

const app = express();
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", 'http://127.0.0.1:8000', 'ws://localhost:42877/']
      }
    }
}));

app.use(bodyParser.json());
postsRoutes(app);

app.get('/', (req, res) => {
    res.send('Hello from Express!')
});

export { app };