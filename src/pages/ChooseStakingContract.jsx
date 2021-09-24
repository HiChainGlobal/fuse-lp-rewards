import React from "react";
import { useDispatch, useSelector } from "react-redux";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import reverse from "lodash/reverse";
import classNames from "classnames";
import RewardCard from "@/components/common/RewardCard";
import Step from "@/components/common/Step";
import comingSoon from "@/assets/images/coming-soon.png";
import telegram from "@/assets/images/telegram-app.svg";
import { selectStakingPlatform } from "@/actions/staking";
import {
  PAIRS_ICONS,
  STAKING_CONTRACTS,
  REWARDS_PLATFORMS_LIST,
  REWARDS_PLATFORMS,
} from "@/constants";
import scheduleLogo from "@/assets/images/hi-schedule.svg";
import btn from "@/assets/images/hi-btn.svg";
import step1 from "@/assets/images/hi-step1.svg";
import step2 from "@/assets/images/hi-step2.svg";
import step3 from "@/assets/images/hi-step3.svg";
import step4 from "@/assets/images/hi-step4.svg";
import backR from "@/assets/images/hi-back-r.svg";
import back from "@/assets/images/hi-back.svg";
export default () => {
  const disptach = useDispatch();
  const { stakingPlatform } = useSelector((state) => state.screens.home);

  const selectPlatform = (platform) => {
    disptach(selectStakingPlatform(platform));
  };

  const contracts = STAKING_CONTRACTS.filter(
    (contract) => contract.platform === stakingPlatform
  );

  return (
    <div className="rewards__wrapper">
      <div className="rewards">
        <div className="rewards__headline">
          <h1>Bonus 1 Million HI Liquidity Provider Rewards Program</h1>
          <p>HI/BUSD Liquidity on PancakeSwap</p>
          <h3>
            Become a Liquidity Provider on PancakeSwap and get extra rewards!
            <span>
              1,000,000 HI will be distributed to liquidity providers who add to
              the HI/BUSD Pair on PancakeSwap, and then stake those LP tokens on
              hi. Liquidity providers will gain rewards based on their
              percentage share of the overall liquidity pool, with 1 million HI
              split between all staked liquidity providers.
            </span>
          </h3>
        </div>
        <div className="rewards__content">
          <div className="img">
            <img src={scheduleLogo} alt="logo" />
          </div>
          <div className="content">
            <h3>SCHEDULE & INCENTIVES</h3>
            <div>
              <p> Program Starting: ???</p>
              <p>Duration: 3 Months (???)</p>
              <p>Liquidity Pool: HI/BUSD</p>
              <p>Total Rewards: 1,000,000 HI</p>
              <p>DEX: PancakeSwap</p>
              <p>Platform: Binance Smart Chain</p>
            </div>
            <h4>
              <img src={btn} alt="btn"></img>
              <p>WATCH TUTORIAL</p>
            </h4>
          </div>
        </div>
        <div className="rewards__img1">
          <img src={backR} alt="" />
        </div>

        <div className="rewards__img2">
          <img src={back} alt="" />
        </div>
        {!isEmpty(contracts) ? (
          contracts.map(({ icon, network, items }, index) => (
            <div
              className="rewards__cards-container grid-x align-middle"
              key={index}
            >
              {reverse(
                map(items, (contract) => {
                  const { contractAddress } = contract;
                  return (
                    <RewardCard
                      className={`reward-card--${stakingPlatform.toLowerCase()}`}
                      icon={PAIRS_ICONS[contract.pairName]}
                      key={contractAddress}
                      {...contract}
                      stakingContract={contractAddress}
                    />
                  );
                })
              )}
            </div>
          ))
        ) : (
          <div className="rewards__coming-soon">
            <img src={comingSoon} />
          </div>
        )}

        <div className="rewards__section">HOW DOES IT WORK?</div>
        <div className="rewards__step">
          <div className="rewards__item">
            <div className="left">
              <img src={step1} alt="logo" />
            </div>
            <div className="right">
              <h3>STEP 1</h3>
              <div>
                Go to PancakeSwap and provide liquidity on the HI/BUSD pair at a
                50:50 ratio.
              </div>
            </div>
          </div>
          <div className="rewards__item">
            <div className="left">
              <img src={step2} alt="logo" />
            </div>
            <div className="right">
              <h3>STEP 2</h3>
              <div>
                Stake your Liquidity Provider tokens of HI/BUSD on this webpage.
              </div>
            </div>
          </div>
          <div className="rewards__item">
            <div className="left">
              <img src={step3} alt="logo" />
            </div>
            <div className="right">
              <h3>STEP 3</h3>
              <div>
                Earn rewards based on your percentage share of the overall
                liquidity pool. To earn extra rewards, do not un-stake your LP
                tokens within 30 days.
              </div>
            </div>
          </div>
          <div className="rewards__item">
            <div className="left">
              <img src={step4} alt="logo" />
            </div>
            <div className="right">
              <h3>STEP 4</h3>
              <div>
                Once the Rewards Program is complete or you choose to remove
                your stake, you may un-stake your LP tokens and claim your
                rewards.
              </div>
            </div>
          </div>
        </div>
        <div className="rewards__terms">
          <a href="">TERMS & CONDITIONS</a>
        </div>
      </div>
    </div>
  );
};
