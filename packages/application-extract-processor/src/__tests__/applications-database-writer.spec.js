const { Readable } = require('stream')

describe('The application extract processor: database-writer', () => {
  it('Calls write application object correctly', async () => {
    const mockWriteApplicationObject = jest.fn(() => ({ insert: 2, update: 0, pending: 0, error: 0 }))
    jest.mock('../write-application-object.js', () => ({
      writeApplicationObject: mockWriteApplicationObject
    }))
    async function * generate () {
      yield { foo: 'bar' }
      yield { foo: 'bax' }
    }
    const readable = Readable.from(generate())
    const { applicationsDatabaseWriter } = await import('../applications-database-writer.js')
    const ts = new Date()
    await applicationsDatabaseWriter(readable, ts)
    expect(mockWriteApplicationObject).toHaveBeenCalledWith({ foo: 'bar' }, ts)
    expect(mockWriteApplicationObject).toHaveBeenCalledWith({ foo: 'bax' }, ts)
    expect(mockWriteApplicationObject).toHaveBeenCalledTimes(2)
  })
})