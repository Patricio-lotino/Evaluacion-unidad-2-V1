const express = require('express')
const StoriesController = require('./controllers/StoriesController')
const PageController = require('./controllers/PageController')
const SqlClient = require('./lib/SqlClient')

const router = express.Router()

// Database Client
const sqlClient = new SqlClient()

// Controllers
const pageController = new PageController()
const storiesController = new StoriesController(sqlClient)

// Routes
router.get('/', storiesController.renderHomeWithStories)
router.get('/about', pageController.renderAbout)

router.get('/stories/create', storiesController.renderStorieCreationForm)
router.post('/stories/create', storiesController.insertAndRenderStorie)

router.get('/stories/:id', storiesController.renderSingleStorie)

router.get('/stories/:id/update', storiesController.renderStorieUpdateForm)
router.post('/stories/:id/update', storiesController.updateAndRenderStorie)

router.post('/stories/:id/delete', storiesController.deleteStorieAndRenderResponse)

router.get('*', pageController.renderNotFound)

module.exports = router
