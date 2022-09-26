/*
 * Mock the hapi request object
 */
const path = '/application/uuid/previous-licence/uuid'
const req = {
  path
}

/*
 * Mock the hapi response toolkit in order to test the results of the request
 */
const codeFunc = jest.fn()
const typeFunc = jest.fn(() => ({ code: codeFunc }))
const h = { response: jest.fn(() => ({ type: typeFunc, code: codeFunc })) }

/*
 * Create the parameters to mock the openApi context which is inserted into each handler
 */
const context = {
  request: {
    params: {
      applicationId: '1e470963-e8bf-41f5-9b0b-52d19c21cb77',
      licenceId: '6829ad54-bab7-4a78-8ca9-dcf722117a45'
    }
  }
}

jest.mock('@defra/wls-database-model')

let models
let deletePreviousLicence
let cache

describe('The deletePreviousLicence handler', () => {
  beforeAll(async () => {
    models = (await import('@defra/wls-database-model')).models
    deletePreviousLicence = (await import('../delete-previous-licence.js')).default
    const REDIS = (await import('@defra/wls-connectors-lib')).REDIS
    cache = REDIS.cache
  })

  it('returns a 204 on a successful delete', async () => {
    models.applications = {
      findByPk: jest.fn(() => ({ id: '1e470963-e8bf-41f5-9b0b-52d19c21cb77' }))
    }
    models.previousLicences = {
      destroy: jest.fn(async () => 1)
    }
    cache.delete = jest.fn()
    await deletePreviousLicence(context, req, h)

    expect(cache.delete).toHaveBeenCalledWith('/application/uuid/previous-licence/uuid')
    expect(codeFunc).toHaveBeenCalledWith(204)
  })

  it('returns a 404 on habitat site not found', async () => {
    models.applications = {
      findByPk: jest.fn(() => ({ id: '1e470963-e8bf-41f5-9b0b-52d19c21cb77' }))
    }
    models.previousLicences = {
      destroy: jest.fn(async () => 0)
    }
    await deletePreviousLicence(context, req, h)

    expect(codeFunc).toHaveBeenCalledWith(404)
  })

  it('returns a 404 on application not found', async () => {
    models.applications = {
      findByPk: jest.fn(() => ({ id: '1e470963-e8bf-41f5-9b0b-52d19c21cb77' }))
    }
    await deletePreviousLicence(context, req, h)
    expect(codeFunc).toHaveBeenCalledWith(404)
  })

  it('throws with an insert error', async () => {
    cache.restore = jest.fn(() => null)
    models.applications = { create: jest.fn(async () => { throw new Error() }) }
    await expect(async () => {
      await deletePreviousLicence(context, req, h)
    }).rejects.toThrow()
  })
})
