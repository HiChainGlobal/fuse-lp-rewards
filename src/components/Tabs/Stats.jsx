import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import get from 'lodash/get'
import Countdown from 'react-countdown'
import moment from 'moment'
import { formatWeiToNumber, symbolFromPair } from '@/utils/format'
import GrayContainer from '@/components/common/GrayContainer.jsx'
import { getRewardTokenName, getPlatformPairName } from '@/utils'

const Stats = () => {
  const { stakingContract, pairName, networkId } = useSelector(state => state.staking)
  const stakingContracts = useSelector(state => state.entities.stakingContracts)
  const symbol = `${getPlatformPairName(networkId)} ${symbolFromPair(pairName)}`
  const globalTotalStake = get(stakingContracts, [stakingContract, 'globalTotalStake'], 0)
  const lockedRewards = get(stakingContracts, [stakingContract, 'lockedRewards'], 0)
  const unlockedReward = get(stakingContracts, [stakingContract, 'unlockedReward'], 0)

  const dateEnd = useMemo(() => {
    const stakingStartTime = Number(get(stakingContracts, [stakingContract, 'stakingStartTime'], 0))
    const stakingPeriod = Number(get(stakingContracts, [stakingContract, 'stakingPeriod'], 0))
    const end = moment.unix(stakingStartTime + stakingPeriod).diff(moment())
    const dateEnd = Date.now() + end
    return dateEnd
  }, [get(stakingContracts, [stakingContract, 'stakingStartTime'], 0), get(stakingContracts, [stakingContract, 'stakingPeriod'], 0)])

  return (
    <div className='stats grid-x grid-margin-x grid-margin-y'>
      <div className='medium-12 small-24 cell'>
        <GrayContainer
          tootlipText='Total Rewards are the total $HI to be rewarded for the program duration.'
          title='Total Rewards'
          symbol={getRewardTokenName(networkId)}
          end={formatWeiToNumber(get(stakingContracts, [stakingContract, 'totalReward'], 0))}
        />
      </div>
      <div className='medium-12 small-24 cell'>
        <GrayContainer
          tootlipText='Total Deposits are the total LP tokens deposited across all participants.'
          title='Total Deposits'
          symbol={symbol}
          end={formatWeiToNumber(globalTotalStake)}
          decimals={2}
        />
      </div>
      <div className='medium-12 small-24 cell'>
        <div className='gray_container'>
          <div className='grid-x align-justify align-middle'>
            <div className='title'>Program Duration</div>
          </div>
          <div className='grid-x align-justify align-middle'>
            <div className='value'>
              <Countdown date={dateEnd} />
            </div>
          </div>
        </div>
      </div>
      {/* <div className='medium-12 small-24 cell'>
        <GrayContainer title='Reward Unlock Rate' symbol='FUSE / day' />
      </div> */}
    </div>
  )
}

export default Stats
