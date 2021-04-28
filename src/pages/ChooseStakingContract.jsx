import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import map from 'lodash/map'
import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'
import reverse from 'lodash/reverse'
import get from 'lodash/get'
import classNames from 'classnames'
import RewardCard from '@/components/common/RewardCard'
import comingSoon from '@/assets/images/coming-soon.png'
import { selectStakingPlatform } from '@/actions/staking'
import { PAIRS_ICONS, STAKING_CONTRACTS, REWARDS_PLATFORMS_LIST, REWARDS_PLATFORMS } from '@/constants'

export default () => {
  const disptach = useDispatch()
  const { stakingPlatform } = useSelector(state => state.screens.home)

  const selectPlatform = (platform) => {
    disptach(selectStakingPlatform(platform))
  }

  const contracts = STAKING_CONTRACTS.filter(contract => contract.platform === stakingPlatform)

  return (
    <div className='rewards__wrapper'>
      <div className='rewards'>
        <div className='rewards__headline'>
          <h1>Fuse LP rewards</h1>
          <p>Please choose your preferred pair, provide liquidity on Uniswap (Ethereum) or Fuseswap (Fuse) and new networks announced soon! 
          Then deposit your LP tokens and start earning Fuse</p>
        </div>
        <div className="rewards__platforms">
          {REWARDS_PLATFORMS_LIST.map(platform => (
            <button 
              className={classNames('rewards__platform', { 
                'rewards__platform--active': stakingPlatform !== 'ComingSoon' && stakingPlatform === platform.name
              })} 
              onClick={() => selectPlatform(platform.name)}
            >
              <div className="rewards__platform__header">
                <img className="rewards__platform__banner" src={platform.banner} />
                <img 
                  className={classNames("rewards__platform__icon", {
                    'rewards__platform__icon--ring': platform.name === REWARDS_PLATFORMS.FUSESWAP
                  })} 
                  src={platform.icon} 
                />
              </div>
              <div className="rewards__platform__footer">
                {platform.label}
              </div>
            </button>
          ))}
        </div>
        <div className='rewards__section'>
          <div className='rewards__section__title'>
            <h3 className='rewards__section__label'>{stakingPlatform !== 'ComingSoon' && stakingPlatform}</h3>
          </div>
        </div>
        {
          !isEmpty(contracts) ? contracts.map(({ icon, network, items }, index) => (
            <div className='rewards__cards-container grid-x align-middle'>
              {
                reverse(map(items, (contract) => {
                  const { contractAddress } = contract
                  return (
                    <RewardCard 
                      className={`reward-card--${stakingPlatform.toLowerCase()}`} 
                      icon={PAIRS_ICONS[contract.pairName]} 
                      key={contractAddress} 
                      {...contract} 
                      stakingContract={contractAddress} 
                    />
                  )
                }))
              }
            </div>
          )) : (
            <div className="rewards__coming-soon">
              <img src={comingSoon} />
            </div>
          )
        }
      </div>
    </div>
  )
}
