"use strict"
const { DB } = require('../helper/util');
const fs = require('fs')

const getAllCourses = () => {
  const { cursos } = DB('cursos')
  return cursos
}

const getOneCourse = (id) => {
  const { cursos } = DB('cursos')
  const course = cursos.find((course) => course.id === Number(id))

  if (!course) {
    return ({ error: '¡Curso no encontrado!' })
  }

  return course;
}

const createNewCourse = ({ nombre, descripcion, precios }) => {
  const { cursos, nextID } = DB('cursos')
  const noRepeat = cursos.findIndex((course) => course.nombre === nombre) > -1;

  if (noRepeat) {
    return ({
      error: '¡Curso existente!'
    })
  }

  const newCourse = {
    id: nextID,
    nombre,
    descripcion,
    precios
  }

  const newList = [...cursos, newCourse]

  const newData = {
    nextID: nextID + 1,
    cursos: newList
  }

  fs.writeFileSync('./src/data/cursos.json', JSON.stringify(newData, null, 2))
  return newCourse
}

const updateOneCourse = (id, changes) => {
  const { cursos, nextID } = DB('cursos')
  const indexCourse = cursos.findIndex((course) => course.id === Number(id))

  if (indexCourse === -1) {
    return ({
      error: '¡Curso no encontrado!'
    })
  }

  const updateCourse = {
    ...cursos[indexCourse],
    ...changes
  }

  cursos[indexCourse] = updateCourse

  const newData = {
    nextID,
    cursos
  }

  fs.writeFileSync('./src/data/cursos.json', JSON.stringify(newData, null, 2))
  return updateCourse
}

const deleteOneCourse = (id) => {
  const { cursos, nextID } = DB('cursos')
  const indexCourse = cursos.findIndex((course) => course.id === Number(id))

  if (indexCourse === -1) {
    return ({
      error: '¡Curso para eliminar no encontrado!'
    })
  }

  const deleteCourse = cursos.splice(indexCourse, 1)

  const newData = {
    nextID,
    cursos
  }
  fs.writeFileSync('./src/data/cursos.json', JSON.stringify(newData, null, 2))

  return ({ 'respuesta': `El curso ${deleteCourse[0].nombre} a sido eliminado` })
}

module.exports = {
  getAllCourses,
  getOneCourse,
  createNewCourse,
  updateOneCourse,
  deleteOneCourse
}