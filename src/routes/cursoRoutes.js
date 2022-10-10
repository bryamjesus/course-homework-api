const express = require('express')
const router = express.Router()
const controller = require('../controllers/cursosController')

router.get('/listar', (require, response) => {
  const resp = controller.getAllCourses()
  response.json(resp)
})

router.get('/mostrar/:id', (require, response) => {
  const { id } = require.params;
  const resp = controller.getOneCourses(id)
  response.json(resp)
})

router.post('/crear', (require, response) => {
  const resp = controller.createNewCourse(require.body)
  response.json(resp)
})

router.put('/actualizar/:id', (require, response) => {
  const resp = controller.updateOneCourse(require.params.id, require.body)
  response.json(resp)
})

module.exports = router