const mongoose = require('mongoose')

describe('Lifecycle', () => {
  it('Erase all data from database-test', () => {
    beforeEach(async () => {
      if (process.env.NODE_ENV === 'test') {
        const conn = await mongoose.connect(process.env.DB_URI)
        await conn.connection.db.dropDatabase()
      }
    })
  })
})
