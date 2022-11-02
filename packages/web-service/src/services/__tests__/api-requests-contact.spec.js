import { ContactRoles } from '../../pages/contact/common/contact-roles.js'

jest.spyOn(console, 'error').mockImplementation(code => {})

describe('The API requests contact service', () => {
  describe('CONTACT requests', () => {
    beforeEach(() => jest.resetModules())

    it('getById calls the API correctly', async () => {
      const mockGet = jest.fn(() => ({ foo: 'bar' }))
      jest.doMock('@defra/wls-connectors-lib', () => ({
        API: {
          get: mockGet
        }
      }))
      const { APIRequests } = await import('../api-requests.js')
      const result = await APIRequests.CONTACT.getById('b306c67f-f5cd-4e69-9986-8390188051b3')
      expect(mockGet).toHaveBeenCalledWith('/contact/b306c67f-f5cd-4e69-9986-8390188051b3')
      expect(result).toEqual(({ foo: 'bar' }))
    })

    it('getById rethrows on error', async () => {
      const mockGet = jest.fn(() => { throw new Error() })
      jest.doMock('@defra/wls-connectors-lib', () => ({
        API: {
          get: mockGet
        }
      }))
      const { APIRequests } = await import('../api-requests.js')
      await expect(() => APIRequests.CONTACT.getById('b306c67f-f5cd-4e69-9986-8390188051b3'))
        .rejects.toThrowError()
    })

    it('update calls the API correctly', async () => {
      const mockPut = jest.fn(() => ({ foo: 'bar' }))
      jest.doMock('@defra/wls-connectors-lib', () => ({
        API: {
          put: mockPut
        }
      }))
      const { APIRequests } = await import('../api-requests.js')
      await APIRequests.CONTACT.update('b306c67f-f5cd-4e69-9986-8390188051b3', { foo: 'bar' })
      expect(mockPut).toHaveBeenCalledWith('/contact/b306c67f-f5cd-4e69-9986-8390188051b3', { foo: 'bar' })
    })

    it('update rethrows on error', async () => {
      const mockPut = jest.fn(() => { throw new Error() })
      jest.doMock('@defra/wls-connectors-lib', () => ({
        API: {
          put: mockPut
        }
      }))
      const { APIRequests } = await import('../api-requests.js')
      await expect(() => APIRequests.CONTACT.update('b306c67f-f5cd-4e69-9986-8390188051b3', { foo: 'bar' }))
        .rejects.toThrowError()
    })

    it('destroy calls the API correctly', async () => {
      const mockDelete = jest.fn(() => ({}))
      jest.doMock('@defra/wls-connectors-lib', () => ({
        API: {
          delete: mockDelete
        }
      }))
      const { APIRequests } = await import('../api-requests.js')
      await APIRequests.CONTACT.destroy('b306c67f-f5cd-4e69-9986-8390188051b3')
      expect(mockDelete).toHaveBeenCalledWith('/contact/b306c67f-f5cd-4e69-9986-8390188051b3')
    })

    it('destroy rethrows on error', async () => {
      const mockDelete = jest.fn(() => { throw new Error() })
      jest.doMock('@defra/wls-connectors-lib', () => ({
        API: {
          delete: mockDelete
        }
      }))
      const { APIRequests } = await import('../api-requests.js')
      await expect(() => APIRequests.CONTACT.destroy('b306c67f-f5cd-4e69-9986-8390188051b3'))
        .rejects.toThrowError()
    })

    it('isImmutable calls the API correctly', async () => {
      const mockGet = jest.fn().mockReturnValueOnce({ id: 'b306c67f-f5cd-4e69-9986-8390188051b3' })
        .mockReturnValue([{ applicationId: 'e6b8de2e-51dc-4196-aa69-5725b3aff732' }])
      jest.doMock('@defra/wls-connectors-lib', () => ({
        API: {
          get: mockGet
        }
      }))
      const { APIRequests } = await import('../api-requests.js')
      const result = await APIRequests.CONTACT.isImmutable('81e36e15-88d0-41e2-9399-1c7646ecc5aa', 'b306c67f-f5cd-4e69-9986-8390188051b3')
      expect(mockGet).toHaveBeenCalledWith('/contact/b306c67f-f5cd-4e69-9986-8390188051b3')
      expect(mockGet).toHaveBeenCalledWith('/application-contacts', 'contactId=b306c67f-f5cd-4e69-9986-8390188051b3')
      expect(result).toEqual(true)
    })

    it('isImmutable calls the API correctly - submitted', async () => {
      const mockGet = jest.fn().mockReturnValueOnce({ id: 'b306c67f-f5cd-4e69-9986-8390188051b3', submitted: '2022-09-12T08:12:47+00:00' })
        .mockReturnValue([{ applicationId: 'e6b8de2e-51dc-4196-aa69-5725b3aff732' }])
      jest.doMock('@defra/wls-connectors-lib', () => ({
        API: {
          get: mockGet
        }
      }))
      const { APIRequests } = await import('../api-requests.js')
      const result = await APIRequests.CONTACT.isImmutable('81e36e15-88d0-41e2-9399-1c7646ecc5aa', 'b306c67f-f5cd-4e69-9986-8390188051b3')
      expect(mockGet).toHaveBeenCalledWith('/contact/b306c67f-f5cd-4e69-9986-8390188051b3')
      expect(result).toEqual(true)
    })

    it('isImmutable calls the API correctly - singular', async () => {
      const mockGet = jest.fn().mockReturnValueOnce({ id: 'b306c67f-f5cd-4e69-9986-8390188051b3', submitted: '2022-09-12T08:12:47+00:00' })
        .mockReturnValue([])
      jest.doMock('@defra/wls-connectors-lib', () => ({
        API: {
          get: mockGet
        }
      }))
      const { APIRequests } = await import('../api-requests.js')
      const result = await APIRequests.CONTACT.isImmutable('81e36e15-88d0-41e2-9399-1c7646ecc5aa', 'b306c67f-f5cd-4e69-9986-8390188051b3')
      expect(mockGet).toHaveBeenCalledWith('/contact/b306c67f-f5cd-4e69-9986-8390188051b3')
      expect(result).toEqual(true)
    })

    it('isImmutable rethrows on error', async () => {
      const mockGet = jest.fn(() => { throw new Error() })
      jest.doMock('@defra/wls-connectors-lib', () => ({
        API: {
          get: mockGet
        }
      }))
      const { APIRequests } = await import('../api-requests.js')
      await expect(() => APIRequests.CONTACT.isImmutable('81e36e15-88d0-41e2-9399-1c7646ecc5aa', 'b306c67f-f5cd-4e69-9986-8390188051b3'))
        .rejects.toThrowError()
    })
  })

  describe('CONTACT requests by role', () => {
    beforeEach(() => jest.resetModules())

    it('throws with an unknown role', async () => {
      const { APIRequests } = await import('../api-requests.js')
      await expect(() => APIRequests.CONTACT.role('bad')).toThrow()
    })

    it('getByApplicationId calls the API correctly', async () => {
      const mockGet = jest.fn(() => ([{ foo: 'bar' }]))
      jest.doMock('@defra/wls-connectors-lib', () => ({
        API: {
          get: mockGet
        }
      }))
      const { APIRequests } = await import('../api-requests.js')
      const result = await APIRequests.CONTACT.role(ContactRoles.APPLICANT).getByApplicationId('b306c67f-f5cd-4e69-9986-8390188051b3')
      expect(mockGet).toHaveBeenCalledWith('/contacts', 'applicationId=b306c67f-f5cd-4e69-9986-8390188051b3&role=APPLICANT')
      expect(result).toEqual(({ foo: 'bar' }))
    })

    it('getByApplicationId rethrows an error', async () => {
      const mockGet = jest.fn(() => { throw new Error() })
      jest.doMock('@defra/wls-connectors-lib', () => ({
        API: {
          get: mockGet
        }
      }))
      const { APIRequests } = await import('../api-requests.js')
      await expect(() => APIRequests.CONTACT.role(ContactRoles.APPLICANT).getByApplicationId('b306c67f-f5cd-4e69-9986-8390188051b3'))
        .rejects.toThrowError()
    })

    it('create calls the API correctly where there is an existing applicant', async () => {
      const mockPost = jest.fn(() => ({ id: '81e36e15-88d0-41e2-9399-1c7646ecc5aa' }))
      const mockGet = jest.fn(() => [{
        id: '7c3b13ef-c2fb-4955-942e-764593cf0ada',
        contactId: '81e36e15-88d0-41e2-9399-1c7646ecc5aa',
        applicationId: 'b306c67f-f5cd-4e69-9986-8390188051b3',
        contactRole: 'APPLICANT'
      }])
      const mockPut = jest.fn()
      jest.doMock('@defra/wls-connectors-lib', () => ({
        API: {
          put: mockPut,
          post: mockPost,
          get: mockGet
        }
      }))
      const { APIRequests } = await import('../api-requests.js')
      await APIRequests.CONTACT.role(ContactRoles.APPLICANT).create('b306c67f-f5cd-4e69-9986-8390188051b3', { foo: 'bar' })
      expect(mockPut).toHaveBeenCalledWith('/application-contact/7c3b13ef-c2fb-4955-942e-764593cf0ada', {
        applicationId: 'b306c67f-f5cd-4e69-9986-8390188051b3',
        contactId: '81e36e15-88d0-41e2-9399-1c7646ecc5aa',
        contactRole: 'APPLICANT'
      })
      expect(mockPost).toHaveBeenCalledWith('/contact', { foo: 'bar' })
    })

    it('create calls the API correctly where there is no existing applicant', async () => {
      const mockPost = jest.fn()
        .mockReturnValueOnce({ id: '81e36e15-88d0-41e2-9399-1c7646ecc5aa' })
        .mockReturnValueOnce({})
      const mockGet = jest.fn(() => [])
      jest.doMock('@defra/wls-connectors-lib', () => ({
        API: {
          post: mockPost,
          get: mockGet
        }
      }))
      const { APIRequests } = await import('../api-requests.js')
      await APIRequests.CONTACT.role(ContactRoles.APPLICANT).create('b306c67f-f5cd-4e69-9986-8390188051b3', { foo: 'bar' })
      expect(mockPost).toHaveBeenCalledWith('/application-contact', {
        applicationId: 'b306c67f-f5cd-4e69-9986-8390188051b3',
        contactId: '81e36e15-88d0-41e2-9399-1c7646ecc5aa',
        contactRole: 'APPLICANT'
      })
      expect(mockPost).toHaveBeenCalledWith('/contact', { foo: 'bar' })
    })

    it('create rethrows an error', async () => {
      const mockPut = jest.fn(() => { throw new Error() })
      jest.doMock('@defra/wls-connectors-lib', () => ({
        API: {
          put: mockPut
        }
      }))
      const { APIRequests } = await import('../api-requests.js')
      await expect(() => APIRequests.CONTACT.role(ContactRoles.APPLICANT).create('b306c67f-f5cd-4e69-9986-8390188051b3', {}))
        .rejects.toThrowError()
    })

    it('assign calls the API correctly where there is an existing relationship', async () => {
      const mockGet = jest.fn().mockReturnValueOnce([]).mockReturnValue([{
        id: 'e8387a83-1165-42e6-afab-add01e77bc4c',
        contactId: '00ed369a-6765-45e3-bdad-546b774319f5',
        applicationId: 'b306c67f-f5cd-4e69-9986-8390188051b3'
      }])
      const mockPut = jest.fn()
      jest.doMock('@defra/wls-connectors-lib', () => ({
        API: {
          get: mockGet,
          put: mockPut
        }
      }))
      const { APIRequests } = await import('../api-requests.js')
      await APIRequests.CONTACT.role(ContactRoles.APPLICANT).assign('b306c67f-f5cd-4e69-9986-8390188051b3', '2342fce0-3067-4ca5-ae7a-23cae648e45c')
      expect(mockPut).toHaveBeenCalledWith('/application-contact/e8387a83-1165-42e6-afab-add01e77bc4c', {
        applicationId: 'b306c67f-f5cd-4e69-9986-8390188051b3',
        contactId: '2342fce0-3067-4ca5-ae7a-23cae648e45c',
        contactRole: 'APPLICANT'
      })
    })

    it('assign calls the API correctly where the relationship is unchanged', async () => {
      const mockGet = jest.fn().mockReturnValueOnce([{
        id: 'e8387a83-1165-42e6-afab-add01e77bc4c',
        contactId: '2342fce0-3067-4ca5-ae7a-23cae648e45',
        applicationId: 'b306c67f-f5cd-4e69-9986-8390188051b3'
      }])
      const mockPut = jest.fn()
      jest.doMock('@defra/wls-connectors-lib', () => ({
        API: {
          get: mockGet,
          put: mockPut
        }
      }))
      const { APIRequests } = await import('../api-requests.js')
      await APIRequests.CONTACT.role(ContactRoles.APPLICANT).assign('b306c67f-f5cd-4e69-9986-8390188051b3', '2342fce0-3067-4ca5-ae7a-23cae648e45c')
      expect(mockPut).not.toHaveBeenCalled()
    })

    it('assign calls the API correctly where there is no existing relationship', async () => {
      const mockGet = jest.fn().mockReturnValueOnce([]).mockReturnValueOnce([])
      const mockPost = jest.fn()
      jest.doMock('@defra/wls-connectors-lib', () => ({
        API: {
          get: mockGet,
          post: mockPost
        }
      }))
      const { APIRequests } = await import('../api-requests.js')
      await APIRequests.CONTACT.role(ContactRoles.APPLICANT).assign('b306c67f-f5cd-4e69-9986-8390188051b3', '2342fce0-3067-4ca5-ae7a-23cae648e45c')
      expect(mockPost).toHaveBeenCalledWith('/application-contact', { applicationId: 'b306c67f-f5cd-4e69-9986-8390188051b3', contactId: '2342fce0-3067-4ca5-ae7a-23cae648e45c', contactRole: 'APPLICANT' })
    })

    it('assign calls the API correctly where there are multiple contacts per role/application', async () => {
      const mockGet = jest.fn().mockReturnValueOnce([])
      const mockPost = jest.fn()
      jest.doMock('@defra/wls-connectors-lib', () => ({
        API: {
          get: mockGet,
          post: mockPost
        }
      }))
      const { APIRequests } = await import('../api-requests.js')
      await APIRequests.CONTACT.role(ContactRoles.AUTHORISED_PERSON).assign('b306c67f-f5cd-4e69-9986-8390188051b3', '2342fce0-3067-4ca5-ae7a-23cae648e45c')
      expect(mockPost).not.toHaveBeenCalledWith()
    })

    it('assign rethrows an error', async () => {
      const mockGet = jest.fn(() => { throw new Error() })
      jest.doMock('@defra/wls-connectors-lib', () => ({
        API: {
          get: mockGet
        }
      }))
      const { APIRequests } = await import('../api-requests.js')
      await expect(() => APIRequests.CONTACT.role(ContactRoles.APPLICANT).assign('b306c67f-f5cd-4e69-9986-8390188051b3'))
        .rejects.toThrowError()
    })

    it('unAssign calls the API correctly where there is a relationship', async () => {
      const mockDelete = jest.fn()
      const mockGet = jest.fn(() => [{
        id: '7c3b13ef-c2fb-4955-942e-764593cf0ada',
        contactId: '2342fce0-3067-4ca5-ae7a-23cae648e45c'
      }])
      jest.doMock('@defra/wls-connectors-lib', () => ({
        API: {
          delete: mockDelete,
          get: mockGet
        }
      }))
      const { APIRequests } = await import('../api-requests.js')
      await APIRequests.CONTACT.role(ContactRoles.APPLICANT).unAssign('b306c67f-f5cd-4e69-9986-8390188051b3')
      expect(mockDelete).toHaveBeenCalledWith('/application-contact/7c3b13ef-c2fb-4955-942e-764593cf0ada')
    })

    it('unAssign does nothing there is no relationship', async () => {
      const mockDelete = jest.fn()
      const mockGet = jest.fn(() => [])
      jest.doMock('@defra/wls-connectors-lib', () => ({
        API: {
          delete: mockDelete,
          get: mockGet
        }
      }))
      const { APIRequests } = await import('../api-requests.js')
      await APIRequests.CONTACT.role(ContactRoles.APPLICANT).unAssign('b306c67f-f5cd-4e69-9986-8390188051b3')
      expect(mockDelete).not.toHaveBeenCalledWith()
    })

    it('unAssign rethrows an error', async () => {
      const mockGet = jest.fn(() => { throw new Error() })
      jest.doMock('@defra/wls-connectors-lib', () => ({
        API: {
          get: mockGet
        }
      }))
      const { APIRequests } = await import('../api-requests.js')
      await expect(() => APIRequests.CONTACT.role(ContactRoles.APPLICANT).unAssign('b306c67f-f5cd-4e69-9986-8390188051b3'))
        .rejects.toThrowError()
    })

    it('findByUser calls the API correctly', async () => {
      const mockGet = jest.fn()
      jest.doMock('@defra/wls-connectors-lib', () => ({
        API: {
          get: mockGet
        }
      }))
      const { APIRequests } = await import('../api-requests.js')
      await APIRequests.CONTACT.role(ContactRoles.APPLICANT).findByUser('b306c67f-f5cd-4e69-9986-8390188051b3', 'USER')
      expect(mockGet).toHaveBeenCalledWith('/contacts', 'userId=b306c67f-f5cd-4e69-9986-8390188051b3&role=APPLICANT')
    })

    it('findByUser rethrows an error', async () => {
      const mockGet = jest.fn(() => { throw new Error() })
      jest.doMock('@defra/wls-connectors-lib', () => ({
        API: {
          get: mockGet
        }
      }))
      const { APIRequests } = await import('../api-requests.js')
      await expect(() => APIRequests.CONTACT.role(ContactRoles.APPLICANT).findByUser('b306c67f-f5cd-4e69-9986-8390188051b3'))
        .rejects.toThrowError()
    })

    it('unlink calls the API correctly - with immutable', async () => {
      const mockDelete = jest.fn()
      const mockGet = jest.fn()
        .mockReturnValueOnce([{
          id: '7c3b13ef-c2fb-4955-942e-764593cf0ada',
          contactId: '412d7297-643d-485b-8745-cc25a0e6ec0a',
          applicationId: '35acb529-70bb-4b8d-8688-ccdec837e5d4'
        }])
        .mockReturnValue([{
          id: '7c3b13ef-c2fb-4955-942e-764593cf0ada',
          contactId: '412d7297-643d-485b-8745-cc25a0e6ec0a',
          applicationId: '35acb529-70bb-4b8d-8688-ccdec837e5d4'
        }, {
          id: '8c3b13ef-c2fb-4955-942e-764593cf0ada',
          contactId: '412d7297-643d-485b-8745-cc25a0e6ec0a',
          applicationId: '45acb529-70bb-4b8d-8688-ccdec837e5d4'
        }])
      jest.doMock('@defra/wls-connectors-lib', () => ({
        API: {
          get: mockGet,
          delete: mockDelete
        }
      }))
      const { APIRequests } = await import('../api-requests.js')
      await APIRequests.CONTACT.role(ContactRoles.APPLICANT).unLink('35acb529-70bb-4b8d-8688-ccdec837e5d4')
      expect(mockDelete).toHaveBeenCalledWith('/application-contact/7c3b13ef-c2fb-4955-942e-764593cf0ada')
    })

    it('unlink calls the API correctly - with mutable', async () => {
      const mockDelete = jest.fn()
      const mockGet = jest.fn()
        .mockReturnValueOnce([{
          id: '7c3b13ef-c2fb-4955-942e-764593cf0ada',
          contactId: '412d7297-643d-485b-8745-cc25a0e6ec0a',
          applicationId: '35acb529-70bb-4b8d-8688-ccdec837e5d4'
        }])
        .mockReturnValue([])
      jest.doMock('@defra/wls-connectors-lib', () => ({
        API: {
          get: mockGet,
          delete: mockDelete
        }
      }))
      const { APIRequests } = await import('../api-requests.js')
      await APIRequests.CONTACT.role(ContactRoles.APPLICANT).unLink('35acb529-70bb-4b8d-8688-ccdec837e5d4')
      expect(mockDelete).toHaveBeenCalledWith('/application-contact/7c3b13ef-c2fb-4955-942e-764593cf0ada')
      expect(mockDelete).toHaveBeenCalledWith('/contact/412d7297-643d-485b-8745-cc25a0e6ec0a')
    })

    it('unlink rethrows an error', async () => {
      const mockGet = jest.fn(() => { throw new Error() })
      jest.doMock('@defra/wls-connectors-lib', () => ({
        API: {
          get: mockGet
        }
      }))
      const { APIRequests } = await import('../api-requests.js')
      await expect(() => APIRequests.CONTACT.role(ContactRoles.APPLICANT).unLink('b306c67f-f5cd-4e69-9986-8390188051b3'))
        .rejects.toThrowError()
    })
  })
})