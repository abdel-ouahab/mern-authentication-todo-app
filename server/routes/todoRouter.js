const express = require('express')
const { getTasks, addTask, completedTask, editTask, deleteTask  } = require('../controllers/todoControllers')

const router = express.Router()

router.get('/', getTasks)
router.post('/', addTask)
router.put('/:id', editTask)
router.put('/:id/complete', completedTask)
router.delete('/:id', deleteTask)

module.exports = router;