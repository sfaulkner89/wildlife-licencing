import { cache } from '../cache.js'

const so = { foo: 'bar' }
const mockSet = jest.fn().mockImplementation(() => {})
const mockGet = jest.fn().mockImplementation(() => {})
const mockDel = jest.fn().mockImplementation(() => {})

jest.mock('@defra/wls-connectors-lib', () => ({
  REDIS: {
    getClient: () => ({
      set: mockSet,
      get: mockGet,
      GETDEL: mockDel
    })
  }
}))

describe('Caching', () => {
  it('the save and restore cache functions are called correctly', async () => {
    await cache.save('key', so)
    await cache.restore('key')
    await cache.delete('key')
    expect(mockSet).toHaveBeenCalledWith('key', JSON.stringify(so), {
      EX: 600
    })
    expect(mockGet).toHaveBeenCalledWith('key', {
      EX: 600
    })
    expect(mockDel).toHaveBeenCalledWith('key')
  })
})