const path = 'user/uuid/application/uuid/eligibility'
const req = {
  path,
  payload: {
    isOwnerOfLand: true,
    permissionsGranted: false,
    permissionsRequired: false,
    hasLandOwnerPermission: true
  }
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
      userId: '1e470963-e8bf-41f5-9b0b-52d19c21cb77',
      applicationId: '1e470963-e8bf-41f5-9b0b-52d19c21cb78'
    }
  }
}

jest.mock('@defra/wls-database-model')

let models
let putApplicationEligibility
let cache
const applicationJson = 'application/json'

const a = {
  firstname: 'g', lastname: 'b'
}

describe('The putApplicationEligibility handler', () => {
  beforeAll(async () => {
    models = (await import('@defra/wls-database-model')).models
    putApplicationEligibility = (await import('../eligibility.js')).putApplicationEligibility
    cache = (await import('../../../../services/cache.js')).cache
    const { SEQUELIZE } = await import('@defra/wls-connectors-lib')
    SEQUELIZE.getSequelize = jest.fn(() => ({
      fn: jest.fn(() => ({})),
      col: jest.fn(() => ({}))
    }))
  })

  it('returns status 200 on a successful update', async () => {
    models.applications = {
      findByPk: jest.fn(() => ({ id: context.request.params.userId })),
      update: jest.fn(() => ([1, [{
        dataValues: {
          application: {
            eligibility: a
          }
        }
      }]]))
    }
    cache.delete = jest.fn()
    cache.save = jest.fn()
    await putApplicationEligibility(context, req, h)
    expect(models.applications.findByPk).toHaveBeenCalledWith(context.request.params.applicationId)
    expect(models.applications.update).toHaveBeenCalledWith({ application: { }, updateStatus: 'L' },
      { returning: ['application'], where: { id: context.request.params.applicationId } })
    expect(cache.save).toHaveBeenCalledWith(path, a)
    expect(cache.delete).toHaveBeenCalledWith(`/user/${context.request.params.userId}/application/${context.request.params.applicationId}/eligibility`)
    expect(h.response).toHaveBeenCalledWith(a)
    expect(typeFunc).toHaveBeenCalledWith(applicationJson)
    expect(codeFunc).toHaveBeenCalledWith(200)
  })

  it('returns 404 on application not found', async () => {
    models.applications = {
      findByPk: jest.fn(() => null)
    }
    await putApplicationEligibility(context, req, h)
    expect(codeFunc).toHaveBeenCalledWith(404)
  })

  it('throws on a database error', async () => {
    models.applications = {
      findByPk: jest.fn(() => ({ id: context.request.params.userId })),
      update: jest.fn(() => { throw new Error() })
    }
    cache.delete = jest.fn()
    cache.save = jest.fn()
    await expect(async () => {
      await putApplicationEligibility(context, req, h)
    }).rejects.toThrow()
  })
})