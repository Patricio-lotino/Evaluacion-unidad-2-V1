class StoriesDAO {
  constructor (dbClient) {
    this.db = dbClient
    this.getAll = this.getAll.bind(this)
    this.getById = this.getById.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getAll () {
    const response = await this.db.query('SELECT id, title, topic, content FROM stories')
    const rows = response[0]
    return rows
  }

  async getById (id) {
    const response = await this.db.query('SELECT id, title, topic, content FROM stories WHERE id = ?', [id])
    const rows = response[0]
    return rows[0]
  }

  async create (storie) {
    const response = await this.db.query('INSERT INTO stories (title, topic, content) VALUES (?, ?, ?)', [storie.title, storie.topic, storie.content])
    const result = response[0]
    return result.insertId
  }

  async update (storie) {
    const response = await this.db.query('UPDATE stories SET title = ?, topic = ?, content = ? WHERE id = ?', [storie.title, storie.topic, storie.content, storie.id])
    const result = response[0]
    return result
  }

  async delete (id) {
    const response = await this.db.query('DELETE FROM stories WHERE id = ?', [id])
    const result = response[0]
    return result
  }
}

module.exports = StoriesDAO
