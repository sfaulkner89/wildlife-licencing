export const requestPath = 'tasks?$select=subject&$expand=regardingobjectid_contact_task' +
  '($select=fullname;$expand=parentcustomerid_account($select=accountName;$expand=createdby' +
  '($select=systemName))),tasktypeid($select=description,counter),refdataId($select=refdataId),' +
  'refdataId2($select=refdata2Id)'

export const srcData = {
  subject: 'Get all things done',
  firstname: 'Brian',
  lastname: 'Jones',
  type: 'dependency',
  account: {
    name: 'Main Account'
  },
  refDataId: '123'
}

export const tgtData = {
  '@odata.etag': 'W/"2751267"',
  tasksid: '5e02378c-736d-ec11-8943-000d3a86e24e',
  subject: 'Get all things done',
  boundRelation: { foo: 'bar' },
  missingBoundRelation: { foo1: 'bar1' },
  refdata: '123',
  regardingobjectid_contact_task: {
    contactid: '5902378c-736d-ec11-8943-000d3a86e24f',
    fullname: 'Brian Jones',
    parentcustomerid_account: {
      parentcustomerid_account: '5902378c-736d-ec11-8943-000d3a86e24fg',
      accountName: 'Main Account'
    }
  },
  tasktypeid: {
    description: 'dependency',
    counter: 4,
    tasktypeid: '5902378c-736d-ec11-8943-000d3a86e24fh'
  }
}

export const tgtKeys = {
  tasks: {
    eid: '5e02378c-736d-ec11-8943-000d3a86e24e',
    entity: 'tasks',
    etag: 'W/"2751267"'
  },
  contact: {
    eid: '5902378c-736d-ec11-8943-000d3a86e24f',
    entity: 'contacts'
  },
  account: {
    eid: '5902378c-736d-ec11-8943-000d3a86e24fg',
    entity: 'account'
  },
  taskType: {
    eid: '5902378c-736d-ec11-8943-000d3a86e24fh',
    entity: 'tasktype'
  }
}

export const tasks = {
  targetEntity: 'tasks',
  targetKey: 'tasksid',
  targetFields: {
    subject: {
      srcPath: 'subject'
    },
    refdata: {
      bind: 'refdata',
      writeOnly: true,
      srcPath: 'refDataId'
    },
    refdata2: { // Not found bound, ignored
      bind: 'refdata2',
      writeOnly: true,
      srcPath: 'refDataId2'
    },
    boundRelation: {
      bind: 'bound-relation',
      writeOnly: true,
      srcFunc: async () => 123456
    },
    missingBoundRelation: { // Ignored
      bind: 'missing-bound-relation',
      writeOnly: true,
      srcFunc: async () => null
    }
  },

  relationships: {
    contact: {
      targetEntity: 'contacts',
      targetKey: 'contactid',
      targetFields: {
        fullname: {
          srcPath: 'fullname',
          srcFunc: o => `${o.firstname} ${o.lastname}`, // Take source data and combine to single field in target
          tgtFunc: s => ([ // Take target data and split into multiple src fields
            { srcPath: 'firstname', value: s.fullname.split(' ')[0] },
            { srcPath: 'lastname', value: s.fullname.split(' ')[1] }
          ])
        }
      },
      fk: 'regardingobjectid_contact_task',
      relationships: {
        account: {
          targetEntity: 'account',
          targetKey: 'parentcustomerid_account',
          targetFields: {
            accountName: {
              srcPath: 'account.name'
            }
          },
          fk: 'parentcustomerid_account',
          relationships: {
            systemUser: {
              targetEntity: 'systemuser',
              targetFields: {
                systemName: {
                  srcFunc: () => 'SYSTEM-USER'
                }
              },
              fk: 'createdby'
            }
          }
        }
      }
    },

    taskType: {
      targetEntity: 'tasktype',
      targetKey: 'tasktypeid',
      targetFields: {
        description: {
          srcPath: 'type'
        },
        counter: {}
      },
      fk: 'tasktypeid'
    },

    refdata: {
      targetEntity: 'refdata',
      targetKey: 'id',
      fk: 'refdataId',
      readOnly: true,
      targetFields: {
        refdataId: {
          srcPath: 'refDataId'
        }
      }
    },

    refdata2: {
      targetEntity: 'refdata2',
      targetKey: 'id',
      fk: 'refdataId2',
      readOnly: true,
      targetFields: {
        refdata2Id: {
          srcPath: 'refData2Id'
        }
      }
    }
  }
}