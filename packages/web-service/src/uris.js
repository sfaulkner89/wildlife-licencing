export const HEALTH = { uri: '/health', page: 'health' }
export const APPLICATIONS = { uri: '/applications', page: 'applications' }
export const LOGIN = { uri: '/login', page: 'login' }
export const REGISTER = { uri: '/register', page: 'register' }
export const TASKLIST = { uri: '/tasklist', page: 'tasklist' }

export const eligibilityURIs = {
  LANDOWNER: { uri: '/landowner', page: 'landowner' },
  LANDOWNER_PERMISSION: { uri: '/landowner-permission', page: 'landowner-permission' },
  CONSENT: { uri: '/consent', page: 'consent' },
  CONSENT_GRANTED: { uri: '/consent-granted', page: 'consent-granted' },
  NOT_ELIGIBLE_LANDOWNER: { uri: '/dropout-landowner', page: 'dropout-landowner' },
  NOT_ELIGIBLE_PROJECT: { uri: '/dropout-project', page: 'dropout-project' },
  ELIGIBILITY_CHECK: { uri: '/eligibility-check', page: 'eligibility-check' },
  ELIGIBLE: { uri: '/eligible', page: 'eligible' }
}

export const contactURIs = {
  ECOLOGIST: {
    NAME: { uri: '/ecologist-name', page: 'ecologist-name' },
    IS_ORGANIZATION: { uri: 'ecologist-company', page: 'ecologist-company' }
  },
  APPLICANT: {
    NAME: { uri: '/applicant-name', page: 'applicant-name' },
    IS_ORGANIZATION: { uri: 'applicant-company', page: 'applicant-company' }
  }
}

export const ERRORS = {
  CLIENT: { page: 'client-error' },
  SERVER: { page: 'server-error' }
}
