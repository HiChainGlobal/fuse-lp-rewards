import React from 'react'
import ReactGA from 'react-ga4'
import get from 'lodash/get'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { utils as web3Utils } from 'web3'

import { withdrawStakeAndInterest, withdrawInterest } from '@/actions/staking'
import { object, number, mixed } from 'yup'
import { Formik, Field, Form } from 'formik'
import { formatWei, formatWeiToNumber, symbolFromPair } from '@/utils/format'
import GrayContainer from '@/components/common/GrayContainer.jsx'
import walletIcon from '@/assets/images/wallet.svg'
import FuseLoader from '@/assets/images/loader-hi.gif'
import PercentageSelector from './PercentageSelector'
import useIsStakingNetwork from '@/hooks/useIsStakingNetwork'
import useSwitchNetwork from '@/hooks/useSwitchNetwork'
import { getNetworkName } from '@/utils/network'
import { getPlatformPairName, getRewardTokenName } from '@/utils'
import { useTranslation } from "react-i18next";

const Scheme = object().noUnknown(false).shape({
  amount: number().positive(),
  submitType: mixed().oneOf(['withdrawStakeAndInterest', 'withdrawInterest']).required().default('withdrawStakeAndInterest')
})

const WithdrawForm = ({ handleConnect }) => {
  const { accountAddress } = useSelector(state => state.network)
  const dispatch = useDispatch()
  const { stakingContract, pairName, networkId } = useSelector(state => state.staking)
  const stakingContracts = useSelector(state => state.entities.stakingContracts)
  const { isWithdraw } = useSelector(state => state.screens.withdraw)
  const isStakingNetwork = useIsStakingNetwork()
  const switchNetwork = useSwitchNetwork()

  const totalStaked = get(stakingContracts, [stakingContract, 'totalStaked'], 0)
  const accruedRewards = get(stakingContracts, [stakingContract, 'accruedRewards'], 0)
  const withdrawnToDate = get(stakingContracts, [stakingContract, 'withdrawnToDate'], 0)
  const symbol = `${getPlatformPairName(networkId)} ${symbolFromPair(pairName)}`

  const onSubmit = (values, formikBag) => {
    const { amount, submitType } = values
    if (submitType === 'withdrawInterest') {
      dispatch(withdrawInterest())
    } else if (submitType === 'withdrawStakeAndInterest') {
      dispatch(withdrawStakeAndInterest(web3Utils.toWei(amount)))
    }
    ReactGA.event({
      category: 'action',
      action: `Action - ${submitType}`,
      label: `${submitType} ${amount} from staking contract: ${stakingContract} `
    })
  }
  const renderForm = ({ values, setFieldValue, dirty, isValid }) => {
    let { t } = useTranslation();
    let { amount } = values
    let decimalsLength = 0
    amount && amount.split('.').length > 1 && (decimalsLength = amount.split('.')[1].length)
    return (
      <Form className='form form--withdraw'>
        <div className='input__wrapper'>
          <div className={classNames('balance', { 'balance--disabled': !accountAddress })}> { t('liquidity_Page_title_4_content_8')} - <span>{formatWei(totalStaked)} {symbol}</span></div>
          <div className='input'>
            <Field name='amount'>
              {({ field }) => <input {...field}   placeholder='0.00' autoComplete='off' />}
            </Field>
            <span className='symbol'>{symbol}</span>
          </div>
        </div>
        <PercentageSelector balance={totalStaked} />
        <div className='gray_container__wrapper' style={{display:'flex',justifyContent: 'space-around'}}>
          <GrayContainer
            decimals={2}
            symbol={getRewardTokenName(networkId)}
            tootlipText={ t('liquidity_page_title_4_?_5')}
            title={ t('liquidity_Page__title_4_content_9')}
            end={isNaN(formatWeiToNumber(accruedRewards)) ? 0 : formatWeiToNumber(accruedRewards)}
            showWithdrawBtn={isStakingNetwork && formatWeiToNumber(accruedRewards) > 0}
            handleWithdraw={() => {
              setFieldValue('submitType', 'withdrawInterest')
            }}
          />
        </div>
        {
          accountAddress && isStakingNetwork && (
            <button
              style={{background:'#30DFC4' }}
              onClick={() => {
                setFieldValue('submitType', 'withdrawStakeAndInterest')
              }}
              disabled={!(isValid && dirty && amount && decimalsLength <=18)}
              className='button'
            >
               { t('liquidity_page_title_4_button_2')}&nbsp;&nbsp;
              {
                isWithdraw && <img src={FuseLoader} alt='Hi loader' />
              }
            </button>
          )
        }
        {
          accountAddress && !isStakingNetwork && (
            <button
            style={{background:'#30DFC4'}}
              onClick={() => switchNetwork(networkId)}
              className='button'
            >
              Switch to {getNetworkName(networkId)}
            </button>
          )
        }
        {
          !accountAddress && (
            <button
            style={{background:'#30DFC4'}}
              onClick={(e) => {
                e.preventDefault()
                handleConnect()
              }}
              type='submit'
              className='button'
            >
              <img style={{ width: '16px', marginRight: '.5em' }} className='icon' src={walletIcon} />
              { t('liquidity_page_button_2')}
            </button>
          )
        }
      </Form>
    )
  }
  return (
    <Formik
      initialValues={{
        amount: ''
      }}
      validationSchema={Scheme}
      render={renderForm}
      onSubmit={onSubmit}
      enableReinitialize
      validateOnChange
    />
  )
}
export default WithdrawForm
