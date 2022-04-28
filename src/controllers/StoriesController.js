const StoriesDAO = require('../models/dao/StoriesDAO')

class StoriesController {
  constructor (db) {
    this.storiesDao = new StoriesDAO(db)
    this.renderHomeWithStories = this.renderHomeWithStories.bind(this)
    this.renderSingleStorie = this.renderSingleStorie.bind(this)
    this.renderStorieCreationForm = this.renderStorieCreationForm.bind(this)
    this.renderStorieUpdateForm = this.renderStorieUpdateForm.bind(this)
    this.insertAndRenderStorie = this.insertAndRenderStorie.bind(this)
    this.updateAndRenderStorie = this.updateAndRenderStorie.bind(this)
    this.deleteStorieAndRenderResponse = this.deleteStorieAndRenderResponse.bind(this)
  }

  async renderHomeWithStories (req, res) {
    const stories = await this.storiesDao.getAll()
    res.render('home', {
      stories
    })
  }

  async renderSingleStorie (req, res) {
    const id = req.params.id

    try {
      const storie = await this.storiesDao.getById(id)

      if (!storie) {
        res.status(404).render('404')
        return
      }

      res.render('storie', {
        id,
        title: storie.title,
        topic: storie.topic,
        content: storie.content
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  renderStorieCreationForm (req, res) {
    res.render('storie-form')
  }

  async renderStorieUpdateForm (req, res) {
    const id = req.params.id

    try {
      const storie = await this.storiesDao.getById(id)

      if (!storie) {
        res.status(404).render('404')
        return
      }

      res.render('storie-form', {
        id,
        title: storie.title,
        topic: storie.topic,
        content: storie.content
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async insertAndRenderStorie (req, res) {
    const title = req.body.title
    const topic = req.body.topic
    const content = req.body.content

    const storie = { title, topic, content }

    try {
      const id = await this.storiesDao.create(storie)

      res.redirect(`/stories/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async updateAndRenderStorie (req, res) {
    const id = req.params.id
    const title = req.body.title
    const topic = req.body.topic
    const content = req.body.content

    try {
      const storie = { title, topic, content, id }

      await this.storiesDao.update(storie)

      res.redirect(`/stories/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async deleteStorieAndRenderResponse (req, res) {
    const id = req.params.id

    try {
      const storie = await this.storiesDao.getById(id)

      if (!storie) {
        res.status(404).render('404')
        return
      }

      await this.storiesDao.delete(id)

      res.render('storie-deleted', {
        id,
        title: storie.title
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }
}

module.exports = StoriesController
