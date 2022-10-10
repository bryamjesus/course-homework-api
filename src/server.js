const express = require('express');
const app = express();
const PORT = 3000

const cursoRoutes = require('./routes/cursoRoutes')

app.use(express.json())

app.use('/cursos', cursoRoutes)

app.listen(PORT, () => console.log(`🚀 Server run on Port ${PORT}`))
