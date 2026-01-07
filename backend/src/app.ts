import express from 'express';
import cors from 'cors';
import router from './router'

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', router)

/* 404 */
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

/* Error handler global */
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(500).json({
    error: 'Internal app error'
  });
});

export default app;