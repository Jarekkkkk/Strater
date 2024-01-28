import Footer from '@/components/Footer'
import Header from '@/components/Header'
import BackButton from '@/components/buttons/BackButton'
import AdjustPanel from '@/components/lpManagement/adjustPanel'
import VaultData from '@/components/vault/VaultData'
import VaultTitle from '@/components/vault/VaultTitle'
import { LIQUIDITY_MANAGEMENT_LIST } from '@/constants/liquidityManagement'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {}

const LiquidityManagementPage = (props: Props) => {
  const router = useRouter()
  const { protocolId } = router.query

  if (!protocolId || protocolId === '' || protocolId === 'null') {
    router.push('/')
  }

  const vaultBasicInfo = LIQUIDITY_MANAGEMENT_LIST[protocolId as string]

  console.log('protocolId', protocolId)

  if (!vaultBasicInfo) {
    router.push('/')
  }

  return (
    <div className='relative w-full justify-center items-center bg-[#ECECEE] flex flex-col xl:pt-25'>
      <Header />
      <div className='w-full max-md:max-w-full bg-main bg-cover bg-center bg-no-repeat'>
        <div className='flex justify-between w-full max-w-258 max-md:flex-col max-md:px-4 max-md:max-w-full max-md:mb-2.5 mx-auto pt-22 pb-56 max-md:pt-16 max-md:pb-16'>
          {/* Information */}
          <div className='flex flex-col items-stretch w-[53%] max-md:w-full max-md:ml-0'>
            <div className='relative flex flex-col max-md:max-w-full max-md:mt-10'>
              <BackButton />
              <VaultTitle
                title='Liquidity Management'
                basicInfo={{
                  name: vaultBasicInfo.name,
                  logo: vaultBasicInfo.logo,
                }}
              />
              <VaultData />
              <div className='w-full flex flex-col items-start gap-9 mt-16 max-md:mt-32 max-md:max-w-full max-md:gap-6'>
                {/* Info */}
                <div className='items-stretch self-stretch flex flex-col max-md:max-w-full '>
                  <div className='text-black text-base max-md:max-w-full'>
                    Description
                  </div>
                  <div className='text-gray-400 text-xs mt-4.5 max-md:max-w-full max-md:mt-3 text-justify'>
                    {vaultBasicInfo.info}
                  </div>
                </div>
                {/* Risk */}
                <div className='items-stretch self-stretch flex flex-col max-md:max-w-full'>
                  <div className='text-black text-base max-md:max-w-full'>
                    How it works
                  </div>
                  <div className='text-gray-400 text-xs mt-4.5 max-md:max-w-full max-md:mt-3'>
                    <ul className='list-disc list-inside space-y-2'>
                      {vaultBasicInfo.howItWorks.contents.map((step, index) => (
                        <li key={vaultBasicInfo.name + '_step_' + index}>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Contract */}
                {/* <div className="items-stretch self-stretch flex flex-col max-md:max-w-full">
                  <div className="text-black text-base max-md:max-w-full">
                    Contract
                  </div>
                  {Object.values(vaultBasicInfo.contract).map(
                    (contract, index) => {
                      return (
                        <div
                          key={
                            contract.name.toLowerCase().replaceAll(" ", "_") +
                            index
                          }
                          className="w-full flex flex-col items-start gap-1.25 max-md:max-w-full"
                        >
                          <Link
                            href={MAINNET_EXPLORER.PROTOCOL + contract.address}
                            className="flex items-center gap-5 mt-4.5 max-md:max-w-full max-md:flex-wrap max-md:justify-center text-gray-400 xl:hover:text-primary xl:hover:underline max-md:flex-col max-md:gap-2 max-md:items-start max-md:mt-3"
                          >
                            <div className={cn("w-51 text-xs")}>
                              {contract.name}
                            </div>
                            <div className="flex items-center gap-5">
                              <div className="w-36 text-xs">
                                {contract.address.slice(0, 9) +
                                  "..." +
                                  contract.address.slice(-9)}
                              </div>
                              <FiExternalLink className="object-contain object-center text-sm overflow-hidden" />
                            </div>
                          </Link>
                        </div>
                      );
                    }
                  )}
                </div> */}
              </div>
            </div>
          </div>
          {/* Control Panel */}
          <AdjustPanel protocol={vaultBasicInfo.name} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default LiquidityManagementPage
