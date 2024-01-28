import { SuiClient, SuiObjectResponse } from '@mysten/sui.js/client'

export async function getKriyaLPBalance(
  client: SuiClient,
  senderAddress: string,
) {
  const resp = await client.getOwnedObjects({
    owner: senderAddress,
    filter: {
      MatchAll: [
        {
          StructType: `0xa0eba10b173538c8fecca1dff298e488402cc9ff374f8a12ca7758eebe830b66::spot_dex::KriyaLPToken<0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2::buck::BUCK, 0x2::sui::SUI>`,
        },
      ],
    },
    options: { showContent: true },
  })
  return resp.data.map((res) => suiObjectToKriyaLP(res))
}

function suiObjectToKriyaLP(resp: SuiObjectResponse) {
  if (resp.error || !resp.data) {
    return null
  }

  const content = resp.data.content
  if (!content) {
    throw new Error(
      'Missing object content. Make sure to fetch the object with `showContent: true`',
    )
  }
  if (content.dataType !== 'moveObject') {
    throw new Error(
      `Wrong object dataType. Expected 'moveObject' but got: '${content.dataType}'`,
    )
  }

  const fields = content.fields as any
  return fields.lsp.fields.balance
}
