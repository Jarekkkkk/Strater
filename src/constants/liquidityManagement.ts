interface Protocol {
  name: string
  logo: string
  info: string
  howItWorks: {
    type: 'number'
    contents: string[]
  }
  contract: Record<
    string,
    {
      name: string
      address: string
    }
  >
}
export const LIQUIDITY_MANAGEMENT_LIST: Record<string, Protocol> = {
  cetus: {
    name: 'Cetus',
    logo: '/images/cetus.png',
    info: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
    howItWorks: {
      type: 'number',
      contents: [
        'Remove liquidity in pool',
        'withdraw all underlying tokens back',
        'add liquidity with new price range',
        '...etc',
      ],
    },
    contract: {
      poolContract: {
        name: 'Cetus Contract ( pool )',
        address:
          '0x9379d2d3f221dcea70f7f7d4a7bf30bab0128bcfda0d13a85267e51f7e6e15c0',
      },
    },
  },
  kriya: {
    name: 'Kriya',
    logo: '/images/kriya.png',
    info: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
    howItWorks: {
      type: 'number',
      contents: [
        'Remove liquidity in pool',
        'withdraw all underlying tokens back',
        'add liquidity with new price range',
        '...etc',
      ],
    },
    contract: {
      poolContract: {
        name: 'Kriya Contract ( pool )',
        address:
          '0x3c334f9d1b969767007d26bc886786f9f197ffb14771f7903cd8772c46d08dea',
      },
    },
  },
}
