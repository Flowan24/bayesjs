import * as expect from 'expect'

import { grassWet, rain, sprinkler } from '../models/rain-sprinkler-grasswet'

import { INetwork } from '../src/types'
import { addNode } from '../src'

describe('addNode', () => {
  it('adds node', () => {
    const network = addNode({}, rain)

    expect(network[rain.id]).toBe(rain)
  })

  it('adds nodes with parents', () => {
    let network: INetwork = {}

    network = addNode(network, rain)
    network = addNode(network, sprinkler)
    network = addNode(network, grassWet)

    expect(network[rain.id]).toBe(rain)
    expect(network[sprinkler.id]).toBe(sprinkler)
    expect(network[grassWet.id]).toBe(grassWet)
  })

  it('throws when adding node with invalid id', () => {
    expect(() => {
      addNode({}, {
        ...rain,
        id: undefined,
      } as any) // eslint-disable-line @typescript-eslint/no-explicit-any
    }).toThrow(/node id is required and must be a string/)

    expect(() => {
      addNode({}, {
        ...rain,
        id: '',
      })
    }).toThrow(/node id is required and must be a string/)

    expect(() => {
      addNode({}, {
        ...rain,
        id: 1,
      } as any) // eslint-disable-line @typescript-eslint/no-explicit-any
    }).toThrow(/node id is required and must be a string/)
  })

  it('throws when adding node with invalid parents', () => {
    expect(() => {
      addNode({}, {
        ...rain,
        parents: undefined,
      } as any) // eslint-disable-line @typescript-eslint/no-explicit-any
    }).toThrow(/node parents must be an array of strings/)

    expect(() => {
      addNode({}, {
        ...rain,
        parents: 1,
      } as any) // eslint-disable-line @typescript-eslint/no-explicit-any
    }).toThrow(/node parents must be an array of strings/)

    expect(() => {
      addNode({}, {
        ...rain,
        parents: [1],
      } as any) // eslint-disable-line @typescript-eslint/no-explicit-any
    }).toThrow(/node parents must be an array of strings/)
  })

  it('throws when adding node with invalid states', () => {
    expect(() => {
      addNode({}, {
        ...rain,
        states: undefined,
      } as any) // eslint-disable-line @typescript-eslint/no-explicit-any
    }).toThrow(/node states must be an array with two or more strings/)

    expect(() => {
      addNode({}, {
        ...rain,
        states: [],
      })
    }).toThrow(/node states must be an array with two or more strings/)

    expect(() => {
      addNode({}, {
        ...rain,
        states: [1],
      } as any) // eslint-disable-line @typescript-eslint/no-explicit-any
    }).toThrow(/node states must be an array with two or more strings/)

    expect(() => {
      addNode({}, {
        ...rain,
        states: 1,
      } as any) // eslint-disable-line @typescript-eslint/no-explicit-any
    }).toThrow(/node states must be an array with two or more strings/)
  })

  it('throws when adding node twice', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let network = {}

      network = addNode(network, rain)
      network = addNode(network, rain)
    }).toThrow(/node is already added/)
  })

  it('throws when adding node with non existent parent', () => {
    expect(() => {
      addNode({}, sprinkler)
    }).toThrow(/node parent was not found/)
  })

  it('throws when node has no parents and cpt is not valid', () => {
    expect(() => {
      addNode({}, {
        ...rain,
        cpt: undefined,
      } as any) // eslint-disable-line @typescript-eslint/no-explicit-any
    }).toThrow(/You must set the probabilities/)

    expect(() => {
      addNode({}, {
        ...rain,
        cpt: { T: 1 },
      })
    }).toThrow(/You must set the probabilities/)

    expect(() => {
      addNode({}, {
        ...rain,
        cpt: { T: 1, F: 'F' },
      } as any) // eslint-disable-line @typescript-eslint/no-explicit-any
    }).toThrow(/You must set the probabilities/)
  })

  it('throws when node has parents and cpt is not valid', () => {
    const network = addNode({}, rain)

    expect(() => {
      addNode(network, {
        ...sprinkler,
        cpt: undefined,
      } as any) // eslint-disable-line @typescript-eslint/no-explicit-any
    }).toThrow(/You must set the probabilities/)
  })
})
