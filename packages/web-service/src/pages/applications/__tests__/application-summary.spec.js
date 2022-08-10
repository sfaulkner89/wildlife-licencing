describe('application-summary page', () => {
  beforeEach(() => jest.resetModules())
  describe('checkData', () => {
    it('returns null if an applicationId is provided and belongs to the user', async () => {
      const mockFindRoles = jest.fn(() => ['USER'])
      jest.doMock('../../../services/api-requests.js', () => ({
        APIRequests: {
          APPLICATION: {
            findRoles: mockFindRoles
          }
        }
      }))

      const mockGetData = jest.fn(() => ({
        userId: '3a0fd3af-cd68-43ac-a0b4-123b79aaa83b',
        applicationId: '94de2969-91d4-48d6-a5fe-d828a244aa18'
      }))
      const request = {
        cache: () => ({
          getData: mockGetData
        }),
        query: { applicationId: '94de2969-91d4-48d6-a5fe-d828a244aa18' }
      }

      const { checkData } = await import('../application-summary.js')
      const result = await checkData(request, null)
      expect(result).toBeNull()
      expect(mockFindRoles).toHaveBeenCalledWith('3a0fd3af-cd68-43ac-a0b4-123b79aaa83b', '94de2969-91d4-48d6-a5fe-d828a244aa18')
    })

    it('returns a redirect to the applications page if an applicationId is provided and it does not belong to the user', async () => {
      const mockFindRoles = jest.fn(() => [])
      jest.doMock('../../../services/api-requests.js', () => ({
        APIRequests: {
          APPLICATION: {
            findRoles: mockFindRoles
          }
        }
      }))

      const mockGetData = jest.fn(() => ({
        userId: '3a0fd3af-cd68-43ac-a0b4-123b79aaa83b',
        applicationId: '94de2969-91d4-48d6-a5fe-d828a244aa18'
      }))
      const request = {
        cache: () => ({
          getData: mockGetData
        }),
        query: { applicationId: '94de2969-91d4-48d6-a5fe-d828a244aa18' }
      }

      const h = {
        redirect: jest.fn()
      }

      const { checkData } = await import('../application-summary.js')
      await checkData(request, h)
      expect(h.redirect).toHaveBeenCalledWith('/applications')
    })

    it('returns a redirect to the applications page if no applicationId is provided', async () => {
      const request = {
        query: {}
      }

      const h = {
        redirect: jest.fn()
      }

      const { checkData } = await import('../application-summary.js')
      await checkData(request, h)
      expect(h.redirect).toHaveBeenCalledWith('/applications')
    })
  })

  describe('statues', () => {
    it('are as expected', async () => {
      const { statuses } = await import('../application-summary.js')
      expect(statuses).toEqual({
        1: 'RECEIVED',
        100000000: 'AWAITING_ALLOCATION',
        100000001: 'ALLOCATED_FOR_ASSESSMENT',
        100000002: 'UNDER_ASSESSMENT',
        100000004: 'GRANTED',
        100000005: 'PAUSED',
        100000008: 'NOT_GRANTED'
      })
    })
  })

  describe('getData', () => {
    it('looks-up the application and applicant and performs the necessary transformation', async () => {
      const mockGetData = jest.fn(() => ({
        userId: '3a0fd3af-cd68-43ac-a0b4-123b79aaa83b'
      }))

      const mockSetData = jest.fn()

      const request = {
        cache: () => ({
          getData: mockGetData,
          setData: mockSetData
        }),
        query: { applicationId: '94de2969-91d4-48d6-a5fe-d828a244aa18' }
      }

      jest.doMock('../../../services/api-requests.js', () => ({
        APIRequests: {
          APPLICATION: {
            getById: jest.fn(() => ({
              id: '94de2969-91d4-48d6-a5fe-d828a244aa18',
              applicationTypeId: '9d62e5b8-9c77-ec11-8d21-000d3a87431b',
              submitted: '2022-08-10T08:18:07.363Z'
            }))
          },
          APPLICANT: {
            getByApplicationId: jest.fn(() => ({
              fullName: 'Joe Blogs'
            }))
          }
        }
      }))

      const { getData } = await import('../application-summary.js')
      const result = await getData(request)
      expect(result).toEqual(expect.objectContaining({
        applicant: {
          fullName: 'Joe Blogs'
        },
        application: {
          applicationType: 'A24',
          applicationTypeId: '9d62e5b8-9c77-ec11-8d21-000d3a87431b',
          id: '94de2969-91d4-48d6-a5fe-d828a244aa18',
          submitted: '10 August 2022'
        }
      }))
    })
  })
})