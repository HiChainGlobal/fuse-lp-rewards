import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useParams } from 'react-router'
import { BigNumber } from 'bignumber.js'
import get from 'lodash/get'
import InfoBox from '@/components/common/InfoBox.jsx'
import Tabs from '@/components/Tabs'
import briefcaseIcongray from '@/assets/images/briefcase-check-gray.svg'
import briefcaseIcon from '@/assets/images/briefcase-check.svg'
import walletIcon from '@/assets/images/wallet-plus.svg'
import walletIcongray from '@/assets/images/wallet-plus-gray.svg'
import percentageIcon from '@/assets/images/percentage.svg'
import percentageIcongray from '@/assets/images/percentage-gray.svg'
import { formatWeiToNumber, symbolFromPair } from '@/utils/format'
import { getBlockExplorerUrl, networkIds } from '@/utils/network'
import useInterval from '@/hooks/useInterval'
import { getStatsData } from '@/actions/staking'
import SwitchNetwork from '@/components/common/SwitchNetwork'
import useSwitchNetwork from '../hooks/useSwitchNetwork'
import { getRewardTokenName } from '@/utils'
import { useTranslation } from "react-i18next";

export default ({ handleConnect }) => {
  let { t } = useTranslation();
  const dispatch = useDispatch()
  const { stakingContract, pairName, lpToken, networkId } = useSelector(state => state.staking)
  const switchNetwork = useSwitchNetwork()
  const stakingContracts = useSelector(state => state.entities.stakingContracts)
  const { accountAddress, providerInfo } = useSelector(state => state.network)
  const [isRunning, setIsRunning] = useState(!!accountAddress)

  const accruedRewards = get(stakingContracts, [stakingContract, 'accruedRewards'], 0)
  const withdrawnToDate = get(stakingContracts, [stakingContract, 'withdrawnToDate'], 0)
  const apyPercent = get(stakingContracts, [stakingContract, 'apyPercent'], 0)
  const accrued = new BigNumber(withdrawnToDate).plus(new BigNumber(accruedRewards))
  const totalStaked = get(stakingContracts, [stakingContract, 'totalStaked'], 0)
  const isExpired = get(stakingContracts, [stakingContract, 'isExpired'])
  const symbol = symbolFromPair(pairName)
  const isSwitchNetworkSupported =
    get(providerInfo, 'id') === 'injected' &&
    get(providerInfo, 'name') === 'MetaMask' &&
    networkId !== networkIds.MAINNET

  if (!stakingContract) {
    return <Redirect to='/' />
  }

  useEffect(() => {
    if (accountAddress) {
      if (isSwitchNetworkSupported) switchNetwork(networkId)
      setIsRunning(true)
    }
  }, [accountAddress, isSwitchNetworkSupported])

  useInterval(() => {
    // get contract stats
    dispatch(getStatsData(stakingContract, lpToken, networkId))
  }, isRunning ? 5000 : null)
  let  createMarkup =(t) =>{
    return {__html: t};
  }
  // let  MyComponent =(t) =>{
  //   return <div dangerouslySetInnerHTML={createMarkup(t)}></div>;
  // }
  return (
    <>
      {!isSwitchNetworkSupported && <SwitchNetwork networkId={networkId} />}
      <div className='main__wrapper'>
        <div className='main'>
          <h1 className='title'>{ t('liquidity_page_title_4')}</h1>
          <div className='content' dangerouslySetInnerHTML={createMarkup(t('liquidity_page_title_4_content_1'))}>
            {/* {t('liquidity_page_title_4_content_1')} */}
            {/* <p> { t('StakingContract.content1')}</p>
            { t('StakingContract.content2')} */}
          </div>
          <div className='boxs'>
            <InfoBox
              decimals={2}
              name='apy'
              modalText= { t('liquidity_page_title_5_content_1')}
              withSymbol={false}
              end={!isExpired ? parseInt(apyPercent) : 0}
              title={t('liquidity_page_title_4_content_2')}
              Icon={() => (
                <img src={accountAddress ? percentageIcon : percentageIcongray} />
              )}
            />
            <InfoBox
              name='deposits'
              symbol={symbol}
              modalText={ t('liquidity_page_title_5_content_2')}
              decimals={8}
              title={ t('liquidity_page_title_4_content_3')}
              end={formatWeiToNumber(totalStaked)}
              Icon={() => (
                <img src={accountAddress ? briefcaseIcon : briefcaseIcongray} />
              )}
              format={false}
            />
            <InfoBox
               decimals={2}
              link={`${getBlockExplorerUrl(networkId)}/address/${CONFIG.rewardTokens[networkId]}`}
              name='rewards'
              symbol={getRewardTokenName(networkId)}
              modalText={t('liquidity_page_title_5_content_3')}
              end={formatWeiToNumber(accrued)}
              title={ t('liquidity_page_title_4_content_4')}
              Icon={() => (
                <img src={accountAddress ? walletIcon : walletIcongray} />
              )}
            />
          </div>
          <Tabs handleConnect={handleConnect} />
        </div>
      </div>
    </>
  )
}
