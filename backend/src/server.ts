import express from 'express';

const app = express();

app.get('/', (req, res) => res.json({ message: 'Olá Mundo' }));

app.listen(3333, () => {
  console.log('👷 Server started in port 3333!');
});
