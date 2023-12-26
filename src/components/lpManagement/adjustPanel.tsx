import Link from 'next/link'
import { Link as LinkIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import FormatNumber from '../formats/formatNumber'
import {
  useCurrentAccount,
  useSignAndExecuteTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit'
import { CetusSDK, liquidityToCoinAmount } from '@/lib/cetus/getter'
import BN from 'bn.js'
import {
  Pool,
  Position,
  PositionUtil,
  TickMath,
  ClmmPoolUtil,
  getNearestTickByTick,
} from '@cetusprotocol/cetus-sui-clmm-sdk'
import { Slider } from '@/components/ui/slider'
import { formatNumber } from '@/lib/format'
import { toast } from 'react-toastify'
import { remove_liquiditiy } from '@/lib/cetus/operations'
import { adjustBuckSuiLiquidity } from '@/lib/cetus/strategies'
const AdjustPanel = () => {
  const [inputAmount, setInputAmount] = useState('')

  const pool_address =
    '0x9379d2d3f221dcea70f7f7d4a7bf30bab0128bcfda0d13a85267e51f7e6e15c0'
  const account = useCurrentAccount()
  const suiClient = useSuiClient()
  const { mutate: signAndExecuteTransactionBlock } =
    useSignAndExecuteTransactionBlock()
  const [position, setPosition] = useState<Position | null>(null)
  const [pool, setPool] = useState<Pool>()
  const [percentage, setPercentage] = useState([50])

  useEffect(() => {
    const getLPBalance = async () => {
      if (!account) return
      const positions = await CetusSDK.Position.getPositionList(
        account.address,
        [pool_address],
      )
      const position = !!positions.length ? positions[0] : null
      setPosition(position)

      const pool = await CetusSDK.Pool.getPool(pool_address)
      CetusSDK.Position.getPosition
      setPool(pool)

      setPercentage([
        position
          ? Math.round(
              ClmmPoolUtil.calculateDepositRatioFixTokenA(
                position.tick_lower_index,
                position.tick_upper_index,
                new BN(pool?.current_sqrt_price),
              ).ratioA.toNumber() * 100,
            )
          : 50,
      ])
    }
    getLPBalance()
  }, [account])

  const [amount0, amount1, diff0, diff1, lowerIndex, upperIndex] =
    useMemo(() => {
      if (!pool || !position) return [0, 0, 0, 0, 0, 0]
      const diff = position.tick_upper_index - position.tick_lower_index
      const lower_index = getNearestTickByTick(
        pool.current_tick_index - Math.round(diff * (1 - percentage[0] / 100)),
        Number(pool.tickSpacing),
      )
      const upper_index = getNearestTickByTick(
        Math.round(diff * (percentage[0] / 100)) + pool.current_tick_index,
        Number(pool.tickSpacing),
      )
      const [amount0_prev, amount1_prev] = liquidityToCoinAmount(
        pool.current_sqrt_price,
        position.liquidity,
        position.tick_upper_index,
        position.tick_lower_index,
        9,
        9,
      )
      const [amount0_post, amount1_post] = liquidityToCoinAmount(
        pool.current_sqrt_price,
        position.liquidity,
        upper_index,
        lower_index,
        9,
        9,
      )

      return [
        amount0_post,
        amount1_post,
        -(amount0_post - amount0_prev),
        -(amount1_post - amount1_prev),
        lower_index,
        upper_index,
      ]
    }, [pool, position, percentage])
  const handleAdjust = async () => {
    if (!account) {
      toast.warning('Please check your wallet connected')
      return
    }
    if (!pool) {
      toast.warning('No pool exist')
      return
    }
    if (!position) {
      toast.warning('Please create position')
      return
    }

    if (diff0 == 0 || diff1 == 0) {
      toast.warning('Please input amount')
      return
    }
    const tx = await adjustBuckSuiLiquidity(
      suiClient as any,
      account.address,
      pool,
      position,
      position.liquidity,
      TickMath.getInitializableTickIndex(lowerIndex, Number(pool.tickSpacing)),
      TickMath.getInitializableTickIndex(upperIndex, Number(pool.tickSpacing)),
      position.liquidity,
      Math.round(amount0 * 10 ** 9),
      Math.round(amount1 * 10 ** 9),
      Math.round(diff0 * 10 ** 9),
      Math.round(diff1 * 10 ** 9),
    )
    if (!tx) return
    // tx.setGasBudget(50_000_000);
    signAndExecuteTransactionBlock(
      {
        transactionBlock: tx as any,
        chain: 'sui:mainnet',
      },
      {
        onSuccess: (res) => {
          suiClient.waitForTransactionBlock({ digest: res.digest }).then(() => {
            if (!!res.digest) {
              toast.success(
                <Link
                  className='flex items-center gap-1 pr-2'
                  target='_blank'
                  href='https://app.cetus.zone/liquidity/position?poolAddress=0x9379d2d3f221dcea70f7f7d4a7bf30bab0128bcfda0d13a85267e51f7e6e15c0'
                >
                  Success! Click to see your position
                  <LinkIcon />
                </Link>,
              )
            } else {
              console.log('test')
              toast.error('Exceed slippage! Try smaller amount')
            }
          })
        },
        onError: (err: Error) => {
          console.log('err', err)
          toast.error('Something went wrong')
        },
      },
    )
  }

  if (position === null) {
    return (
      <div className='w-[36%] flex flex-col items-center max-md:w-full'>
        <div className='shadow-lg bg-white relative flex w-full h-60 flex-col mt-10 mx-auto py-14 px-15 rounded-md max-md:mt-10 max-md:px-10 items-start'>
          <span className='text-black text-xl self-stretch text-justify'></span>

          <a
            target='_blank'
            href={
              'https://app.cetus.zone/liquidity/deposit?poolAddress=0x9379d2d3f221dcea70f7f7d4a7bf30bab0128bcfda0d13a85267e51f7e6e15c0'
            }
            className='flex justify-center items-center gap-2 mt-7 max-md:mt-7 xl:hover:scale-105 xl:active:scale-95 ease-in-out duration-300'
          >
            <span className='text-black text-xl whitespace-nowrap'>
              Depsit BUCK/SUI on Cetus
            </span>
            <FiExternalLink className='object-contain object-center text-black text-xl overflow-hidden' />
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className='w-[36%] flex flex-col items-center max-md:w-full'>
      <div className='shadow-lg bg-white relative flex w-full h-160 flex-col mt-10 mx-auto py-13.5 px-13 rounded-md max-md:mt-10 max-md:px-10'>
        <span className='w-fit text-black text-xl self-stretch text-justify'>
          Adjust your position in BUCK/SUI pool{' '}
        </span>
        <div className='flex max-w-full gap-5 mt-5.5 self-end'>
          <span className='text-neutral-400 text-xs'>Staked LP</span>
          <FormatNumber
            value={123.0}
            notation='standard'
            maxFractionDigits={4}
            minFractionDigits={2}
            skeletonClass='w-16 h-4'
            numberClass='text-neutral-400 text-right text-xs underline self-stretch whitespace-nowrap'
          />
        </div>
        <div className='items-center bg-neutral-100 self-stretch flex w-full gap-2 mt-3.5 pl-6 pr-8 py-6 border-[0.3px] border-solid border-gray-400 max-md:px-5'>
          <input
            className='text-black text-base caret-black w-full placeholder:text-neutral-400 bg-transparent outline-none'
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            placeholder='0'
            value={formatNumber(diff0, 6, 9)}
          />
          <div className='self-stretch w-15 flex items-stretch justify-between gap-3'>
            <Image
              src='/images/bucket.svg'
              alt='bucket logo'
              className='aspect-square object-contain object-center min-w-6 overflow-hidden max-w-full rounded-[50%]'
              width={24}
              height={24}
            />
            <span className='text-black text-base self-center whitespace-nowrap my-auto'>
              BUCK
            </span>
          </div>
        </div>
        <div className='items-center bg-neutral-100 self-stretch flex w-full gap-2 mt-3.5 pl-6 pr-8 py-6 border-[0.3px] border-solid border-gray-400 max-md:px-5'>
          <input
            className='text-black text-base caret-black w-full placeholder:text-neutral-400 bg-transparent outline-none'
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            placeholder='0'
            value={formatNumber(diff1, 6, 9)}
          />
          <div className='self-stretch w-15 flex items-stretch justify-between gap-3'>
            <Image
              src='/images/sui-logo-white.svg'
              alt='sui logo'
              className='aspect-square object-contain object-center min-w-6 overflow-hidden max-w-full rounded-[50%]'
              width={24}
              height={24}
            />
            <span className='text-black text-base self-center whitespace-nowrap my-auto'>
              SUI
            </span>
          </div>
        </div>
        <button
          onClick={() => setPercentage([50])}
          className='w-20 mx-auto h-12 mt-1 rounded-md bg-blue-500 hover:bg-blue-400 hover:scale-[1.01] text-white px-1.5'
        >
          Balance
        </button>
        <div className='w-full h-15'>
          <Slider
            defaultValue={[50]}
            max={100}
            min={0}
            step={1}
            className='mt-9'
            value={percentage}
            onValueChange={setPercentage}
          />
        </div>
        <div className='self-center w-full flex flex-col gap-2.5 mt-12'>
          <div className='w-full flex justify-between'>
            <div className='text-black text-xs'>Liquidity BUCK</div>
            <FormatNumber
              value={amount0}
              unit=''
              maxFractionDigits={4}
              minFractionDigits={0}
              spaceWithUnit
              skeletonClass='w-16 h-4'
              numberClass='text-black text-right text-xs'
            />
          </div>
          <div className='w-full flex justify-between'>
            <div className='text-black text-xs'>Liquidity SUI</div>
            <FormatNumber
              value={amount1}
              unit=''
              maxFractionDigits={4}
              minFractionDigits={0}
              spaceWithUnit
              skeletonClass='w-16 h-4'
              numberClass='text-black text-right text-xs'
            />
          </div>
          <div className='w-full flex justify-between'>
            <div className='text-black text-xs'>Position Range</div>
            <p className='flex items-center gap-1.5'>
              <FormatNumber
                value={
                  position
                    ? TickMath.tickIndexToPrice(lowerIndex, 9, 9).toNumber()
                    : 0
                }
                unit='SUI'
                maxFractionDigits={4}
                minFractionDigits={0}
                spaceWithUnit
                skeletonClass='w-16 h-4'
                numberClass='text-black text-right text-xs'
              />
              <span className='text-black text-right text-xs'>~</span>
              <FormatNumber
                value={
                  position
                    ? TickMath.tickIndexToPrice(upperIndex, 9, 9).toNumber()
                    : 0
                }
                unit='SUI'
                maxFractionDigits={4}
                spaceWithUnit
                skeletonClass='w-16 h-4'
                numberClass='text-black text-right text-xs'
              />
            </p>
          </div>
        </div>
        <button
          className='text-blue-600 text-xl whitespace-nowrap justify-center items-center border bg-white self-stretch mt-12 px-5 py-2.5 rounded-lg border-solid border-blue-600 max-md:mt-10 xl:hover:scale-105 xl:active:scale-95 ease-in-out duration-300'
          onClick={handleAdjust}
        >
          Adjust
        </button>
      </div>
    </div>
  )
}

export default AdjustPanel
