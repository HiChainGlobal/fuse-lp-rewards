import React from "react";
import { useDispatch, useSelector } from "react-redux";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import reverse from "lodash/reverse";
import RewardCard from "@/components/common/RewardCard";
import comingSoon from "@/assets/images/coming-soon.png";
import { selectStakingPlatform } from "@/actions/staking";
import {
  PAIRS_ICONS,
  STAKING_CONTRACTS,
} from "@/constants";
import { useTranslation } from "react-i18next";
import scheduleLogo from "@/assets/images/hi-schedule.svg";
import btn from "@/assets/images/hi-btn.svg";
import step1 from "@/assets/images/hi-step1.svg";
import step2 from "@/assets/images/hi-step2.svg";
import step3 from "@/assets/images/hi-step3.svg";
import step4 from "@/assets/images/hi-step4.svg";
import backR from "@/assets/images/hi-back-r.svg";
import back from "@/assets/images/hi-back.svg";

export default () => {
  let { t } = useTranslation();
  const disptach = useDispatch();
  const { stakingPlatform } = useSelector((state) => state.screens.home);

  const selectPlatform = (platform) => {
    disptach(selectStakingPlatform(platform));
  };

  const contracts = STAKING_CONTRACTS.filter(
    (contract) => contract.platform === stakingPlatform
  );
  function createMarkup(t) {
    return {__html: t};
  }
  
  return (
    <div className="rewards__wrapper">
      <div className="rewards">
        <div className="rewards__headline">
          <h1>{t("liquidity_page_hero_title")}</h1>
          <p>{t("liquidity_page_hero_subtitle")}</p>
          <h3>
            {t("liquidity_page_hero_content")}
          </h3>
        </div>
        <div className="rewards__content">
          <div className="img">
            <img src={scheduleLogo} alt="logo" />
          </div>
          <div className="content">
            <h3>{t("liquidity_page_title_1_content_1")}</h3>
            <div dangerouslySetInnerHTML={createMarkup(t('liquidity_page_title_1'))}>
             {/* {t("liquidity_page_title_1")} */}
            </div>
            <h4>
              <img src={btn} alt="btn"></img>
              <p>{t("liquidity_page_title_1_button_1")}</p>
            </h4>
          </div>
        </div>
        <div className="rewards__img1">
          <img src={backR} alt="img" />
        </div>

        <div className="rewards__img2">
          <img src={back} alt="img" />
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

        <div className="rewards__section">{t("liquidity_Page_title_3")}</div>
        <div className="rewards__step">
          <div className="rewards__item">
            <div className="left">
              <img src={step1} alt="logo" />
            </div>
            <div className="right" dangerouslySetInnerHTML={createMarkup(t('mobile_liquidity_Page_title_3_content_1'))}>
            </div>
          </div>
          <div className="rewards__item">
            <div className="left">
              <img src={step2} alt="logo" />
            </div>
            <div className="right" dangerouslySetInnerHTML={createMarkup(t('mobile_liquidity_Page_title_3_content_2'))}>
             
            </div>
          </div>
          <div className="rewards__item">
            <div className="left">
              <img src={step3} alt="logo" />
            </div>
            <div className="right" dangerouslySetInnerHTML={createMarkup(t('mobile_liquidity_Page_title_3_content_3'))}>
            </div>
          </div>
          <div className="rewards__item">
            <div className="left">
              <img src={step4} alt="logo" />
            </div>
            <div className="right" dangerouslySetInnerHTML={createMarkup(t('mobile_liquidity_Page_title_3_content_4'))}>
            </div>
          </div>
        </div>
        <div className="rewards__terms">
          <a href="">{t("liquidity_Page_title_3_button_1")}</a>
        </div>
      </div>
    </div>
  );
};
