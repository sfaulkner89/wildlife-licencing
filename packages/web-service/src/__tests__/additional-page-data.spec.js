describe('additional page data', () => {
  beforeEach(() => jest.resetModules())
  it('return response-toolkit continue', async () => {
    const request = {
      method: 'get',
      auth: {
        credentials: 'credentials'
      },
      response: {
        variety: 'view',
        source: {
          context: {}
        }
      }
    }

    const h = {
      continue: 'continue'
    }
    const { additionalPageData } = await import('../additional-page-data.js')
    const result = await additionalPageData(request, h)
    expect(result).toEqual('continue')
    expect(request.response.source.context).toEqual({
      _uri: {
        applicantAddress: '/applicant-address',
        applicantEmail: '/applicant-email',
        applicantIsOrganisation: '/applicant-organisation',
        applicantName: '/applicant-name',
        applicantNames: '/applicant-names',
        applicantOrganisations: '/applicant-organisations',
        applicantPostcode: '/applicant-postcode',
        applicantUser: '/applicant-user',
        classMitigation: '/class-mitigation',
        classMitigationDetails: '/enter-class-mitigation-details',
        consent: '/consent',
        consentGranted: '/consent-granted',
        ecologistAddress: '/ecologist-address',
        ecologistEmail: '/ecologist-email',
        ecologistIsOrganisation: '/ecologist-organisation',
        ecologistName: '/ecologist-name',
        ecologistNames: '/ecologist-names',
        ecologistOrganisations: '/ecologist-organisations',
        ecologistPostcode: '/ecologist-postcode',
        ecologistUser: '/ecologist-user',
        experienceDetails: '/enter-experience',
        landowner: '/landowner',
        landownerPermission: '/landowner-permission',
        licenceDetails: '/licence',
        login: '/login',
        methodExperience: '/enter-methods',
        previousLicence: '/previous-licence',
        register: '/register',
        signOut: '/sign-out'
      },
      credentials: 'credentials'
    })
  })
})
