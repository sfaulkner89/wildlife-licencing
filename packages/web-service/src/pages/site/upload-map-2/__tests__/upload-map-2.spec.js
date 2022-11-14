
describe('the map of the site showing the mitigations during development page handler', () => {
  beforeEach(() => jest.resetModules())

  it('getData', async () => {
    jest.doMock('../../../../services/api-requests.js', () => ({
      tagStatus: {
        IN_PROGRESS: 'IN_PROGRESS',
        NOT_STARTED: 'not-started'
      },
      APIRequests: {
        APPLICATION: {
          tags: () => {
            return { get: jest.fn() }
          }
        }
      }
    }))
    const request = {
      cache: () => ({
        getData: () => ({ })
      })
    }

    const { getData } = await import('../upload-map-2.js')
    expect(await getData(request)).toBeNull()
  })

  it('should calls the s3 upload and redirects to the add a map of the site showing the mitigations after development page', async () => {
    const mockSetData = jest.fn()
    const mockS3FileUpload = jest.fn()
    const mockUpdate = jest.fn()

    jest.doMock('../../../../services/api-requests.js', () => ({
      tagStatus: {
        NOT_STARTED: 'NOT_STARTED'
      },
      APIRequests: {
        SITE: {
          update: mockUpdate
        },
        APPLICATION: {
          tags: () => {
            return { get: () => false }
          }
        }
      }
    }))

    const request = {
      cache: () => ({
        getData: () => ({
          fileUpload: { filename: 'demo.jpg', path: '/tmp/path' },
          applicationId: 123,
          siteData: { id: 45678, name: 'site-name', address: '123 site street, Birmingham, B1 4HY', siteMapFiles: { activity: 'site.pdf' } }
        }),
        setData: mockSetData
      })
    }

    jest.doMock('../../../../services/s3-upload.js', () => ({
      s3FileUpload: mockS3FileUpload
    }))
    const { completion } = await import('../upload-map-2.js')
    const result = await completion(request)
    expect(result).toEqual('/upload-map-3')
    expect(mockUpdate).toHaveBeenCalledWith(45678,
      { address: '123 site street, Birmingham, B1 4HY', name: 'site-name', siteMapFiles: { activity: 'site.pdf', mitigationsDuringDevelopment: 'demo.jpg' } })
    expect(mockS3FileUpload).toHaveBeenCalledWith(123, 'demo.jpg', '/tmp/path',
      { filetype: 'MAP', multiple: true, supportedFileTypes: ['JPG', 'PNG', 'GEOJSON', 'KML', 'SHAPE', 'PDF'] })
    expect(mockSetData).toHaveBeenCalled()
  })

  it('should not calls the s3 upload when there is no file uploaded', async () => {
    const mockSetData = jest.fn()
    const mockS3FileUpload = jest.fn()
    const mockUpdate = jest.fn()

    jest.doMock('../../../../services/api-requests.js', () => ({
      tagStatus: {
        NOT_STARTED: 'NOT_STARTED'
      },
      APIRequests: {
        SITE: {
          update: mockUpdate
        },
        APPLICATION: {
          tags: () => {
            return { get: () => false }
          }
        }
      }
    }))

    const request = {
      cache: () => ({
        getData: () => ({
          applicationId: 123,
          siteData: { id: 45678, name: 'site-name', address: '123 site street, Birmingham, B1 4HY', siteMapFiles: { activity: 'site.pdf' } }
        }),
        setData: mockSetData
      })
    }

    jest.doMock('../../../../services/s3-upload.js', () => ({
      s3FileUpload: mockS3FileUpload
    }))
    const { completion } = await import('../upload-map-2.js')
    const result = await completion(request)
    expect(result).toEqual('/upload-map-3')
    expect(mockUpdate).not.toHaveBeenCalled()
    expect(mockS3FileUpload).not.toHaveBeenCalled()
    expect(mockSetData).not.toHaveBeenCalled()
  })

  it('should redirect user to the check site answers page, when the tag is complete', async () => {
    const mockSetData = jest.fn()
    const mockS3FileUpload = jest.fn()
    const mockUpdate = jest.fn()

    jest.doMock('../../../../services/api-requests.js', () => ({
      tagStatus: {
        NOT_STARTED: 'NOT_STARTED',
        COMPLETE: 'complete'
      },
      APIRequests: {
        SITE: {
          update: mockUpdate
        },
        APPLICATION: {
          tags: () => {
            return { get: jest.fn(() => 'complete') }
          }
        }
      }
    }))

    const request = {
      cache: () => ({
        getData: () => ({
          applicationId: 123,
          siteData: { id: 45678, name: 'site-name', address: '123 site street, Birmingham, B1 4HY', siteMapFiles: { activity: 'site.pdf' } }
        }),
        setData: mockSetData
      })
    }

    jest.doMock('../../../../services/s3-upload.js', () => ({
      s3FileUpload: mockS3FileUpload
    }))
    const { completion } = await import('../upload-map-2.js')
    expect(await completion(request)).toEqual('/check-site-answers')
  })
})
