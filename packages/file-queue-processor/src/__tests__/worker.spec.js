
jest.mock('@defra/wls-database-model')
jest.mock('@defra/wls-connectors-lib')

describe('The file job processor', () => {
  beforeEach(async () => {
    jest.resetModules()
  })

  afterEach(async () => {
    jest.restoreAllMocks()
  })

  it('returns resolve on registration', async () => {
    jest.doMock('@defra/wls-queue-defs', () => ({
      getQueue: jest.fn(() => ({
        process: jest.fn(),
        isPaused: jest.fn(() => false),
        pause: jest.fn(),
        resume: jest.fn()
      })),
      queueDefinitions: {
        FILE_QUEUE: {
        }
      }
    }))
    jest.doMock('@defra/wls-connectors-lib', () => ({
      AWS: () => ({ S3Client: jest.fn(), GetObjectCommand: jest.fn() }),
      SEQUELIZE: { DataTypes: 'foo', QueryTypes: 'foo' },
      GRAPH: { getClient: jest.fn() }
    }))
    const { worker } = await import('../worker.js')
    const { queueDefinitions, getQueue } = await import('@defra/wls-queue-defs')
    await expect(worker()).resolves.not.toBeDefined()
    expect(getQueue).toHaveBeenCalledWith(queueDefinitions.FILE_QUEUE)
  })

  it('returns resolve on registration and unpause queue', async () => {
    const mockResume = jest.fn()
    jest.doMock('@defra/wls-queue-defs', () => ({
      getQueue: jest.fn(() => ({
        process: jest.fn(),
        isPaused: jest.fn(() => true),
        pause: jest.fn(),
        resume: mockResume
      })),
      queueDefinitions: {
        FILE_QUEUE: {
        }
      }
    }))
    jest.doMock('@defra/wls-connectors-lib', () => ({
      AWS: () => ({ S3Client: jest.fn(), GetObjectCommand: jest.fn() }),
      SEQUELIZE: { DataTypes: 'foo', QueryTypes: 'foo' },
      GRAPH: { getClient: jest.fn() }
    }))
    const { worker } = await import('../worker.js')
    const { queueDefinitions, getQueue } = await import('@defra/wls-queue-defs')
    await expect(worker()).resolves.not.toBeDefined()
    expect(mockResume).toHaveBeenCalled()
    expect(getQueue).toHaveBeenCalledWith(queueDefinitions.FILE_QUEUE)
  })

  it('pauses queue when terminated with SIGINT', async () => {
    const mockPause = jest.fn()
    jest.mock('@defra/wls-queue-defs', () => ({
      getQueue: jest.fn(() => ({
        process: jest.fn(() => {
          process.emit('SIGINT')
        }),
        isPaused: jest.fn(),
        pause: mockPause,
        resume: jest.fn()
      })),
      queueDefinitions: {
        FILE_QUEUE: {}
      }
    }))
    const { worker } = await import('../worker.js')
    const processExitSpy = jest
      .spyOn(process, 'exit')
      .mockImplementation(code => {
        console.log(code)
      })

    await expect(async () => {
      await worker()
    }).not.toThrowError()

    expect(processExitSpy).toHaveBeenCalledWith(1)
    expect(mockPause).toHaveBeenCalled()
  })

  it('pauses queue when terminated with SIGTERM', async () => {
    const mockPause = jest.fn()
    jest.mock('@defra/wls-queue-defs', () => ({
      getQueue: jest.fn(() => ({
        process: jest.fn(() => {
          process.emit('SIGTERM')
        }),
        isPaused: jest.fn(),
        pause: mockPause,
        resume: jest.fn()
      })),
      queueDefinitions: {
        FILE_QUEUE: {}
      }
    }))
    const { worker } = await import('../worker.js')
    const processExitSpy = jest
      .spyOn(process, 'exit')
      .mockImplementation(code => {
        console.log(code)
      })

    await expect(async () => {
      await worker()
    }).not.toThrowError()

    expect(processExitSpy).toHaveBeenCalledWith(1)
    expect(mockPause).toHaveBeenCalled()
    jest.restoreAllMocks()
  })
})