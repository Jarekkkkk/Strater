import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client'
import { Inputs } from '@mysten/sui.js/transactions'

export const suiClient = new SuiClient({ url: getFullnodeUrl('mainnet') })

export const COIN_TYPES: Record<string, string> = {
  SUI: '0x2::sui::SUI',
  USDC: '0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN',
  BUCK: '0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2::buck::BUCK',
  afSUI:
    '0xf325ce1300e8dac124071d3152c5c5ee6174914f8bc2161e88329cf579246efc::afsui::AFSUI',
  haSUI:
    '0xbde4ba4c2e274a60ce15c1cfff9e5c42e41654ac8b6d906a57efa4bd3c29f47d::hasui::HASUI',
  vSUI: '0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::CERT',
}

export const getSymbolByType = (type: string): string | null =>
  Object.keys(COIN_TYPES).find((c) => COIN_TYPES[c] === type) ?? null

export const CLOCK_OBJECT = Inputs.SharedObjectRef({
  objectId: '0x6',
  initialSharedVersion: 1,
  mutable: false,
})

export const SYSTEM_STATE_OBJECT = Inputs.SharedObjectRef({
  objectId: '0x5',
  initialSharedVersion: 1,
  mutable: true,
})
