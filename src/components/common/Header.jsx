import React, { useState, useRef } from "react";
import classNames from "classnames";
import get from "lodash/get";
import { useRouteMatch, withRouter } from "react-router";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next'
import AddLiquidity from "@/components/common/AddLiquidity";
import useOutsideClick from "@/hooks/useOutsideClick.jsx";
import { addressShortener } from "@/utils/format";
import walletIcon from "@/assets/images/wallet.svg";
import fuseLogo from "@/assets/images/hi-logo.svg";
import lang from "@/assets/images/hi-lang.svg";
import dropdown from "@/assets/images/hi-dropdown.svg"

const NavBar = ({ history, handleConnect, handleLogout }) => {
  let { t ,i18n} = useTranslation()
  const stakingPageMatch = useRouteMatch("/staking-contract");
  const { stakingContract, lpToken } = useSelector((state) => state.staking);
  const stakingContracts = useSelector(
    (state) => state.entities.stakingContracts
  );
  const { accountAddress, providerInfo } = useSelector(
    (state) => state.network
  );

  const [isOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef(null);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOutsideClick(hamburgerRef, () => {
    if (isOpen) {
      setMenuOpen(false);
    }
  });

  useOutsideClick(dropdownRef, () => {
    if (isDropdownOpen) {
      setDropdownOpen(false);
    }
  });

  const homePage = () => history.push("/");

  const accounts = useSelector((state) => state.accounts);
  const balance = get(accounts, [accountAddress, "balances", lpToken], 0);
  const totalStaked = get(
    stakingContracts,
    [stakingContract, "totalStaked"],
    0
  );
  const langs = [
    {short:'繁' , label: "繁體中文", value: "zh_HK" },
    {short:'EN' , label: "English", value: "en" },
    // {short:'简' , label: "简体中文", value: "zh_CN" },
    // {short:'FR' ,label: "Français", value: "fr" },
    // {short:'DE' , label: "Deutsch", value: "de" },
    // {short:'IT' ,label: "Italiano", value: "it" },
    // {short:'日' , label: "日本語", value: "zh_CN" },
    // {short:'한국어' , label: "한국어", value: "ko" },
    // {short:'PL' ,label: "Polski", value: "pl" },
    // {short:'PT' , label: "Português", value: "pt" },
    // {short:'RU' , label: "Pусский", value: "ru" },
    // {short:'ES' ,label: "Español", value: "es" },
    // {short:'TR' , label: "Türkçe", value: "tr" },
    // {short:'RO' , label: "Română", value: "ro" },
  ];
  const [show, setShow] = useState(false)
  let I18N= localStorage.getItem('I18N')
  let select = 1
  langs.forEach((item,index)=>{
    if(item.value == I18N){
      select  = index 
    }
  })
  let [selectIndex,setSelectIndex] = useState(select)
  const isShow=()=>{
    setShow(!show)
  }
  const selectLang =(index,value)=>{
    console.log(index,value);
    localStorage.setItem('I18N',value)
    i18n.changeLanguage(i18n.language=value)
    setSelectIndex(index)
    setShow(false)
  }
    
  return (
    <div style={{ position: "relative" }}>
      <header className="header__wrapper">
        <div className="header">
          <div onClick={homePage} className="header__logo">
            <img style={{ width: "120px" }} alt="logo" src={fuseLogo} />
          </div>
          {/* <button
            ref={hamburgerRef}
            className="hamburger-button__container"
            onClick={() => setMenuOpen(!isOpen)}
          >
            <span className="hamburger-button__top" />
            <span className="hamburger-button__middle" />
            <span className="hamburger-button__bottom" />
          </button> */}
          <div
            className={classNames("header__nav", { header__nav__open: isOpen })}
          >
            <div className="header__link__wrapper">
             

              <a
                rel="noreferrer noopener"
                className={classNames("header__link", {
                  "header__link--dark": isOpen,
                })}
                target="_blank"
                href="https://resources.hi.com/new-liquidity-reward-program-on-pancakeswap"
                style={{ color: "#000" }}
              >
               { t('liquidity_page_button_1')}
              </a>
            </div>
            <div className={classNames('header__lang-tags','header__right',{'header__show':show})}> 
              {
                langs.map(({label,value},index) => {
                 return  <a  onClick={()=>selectLang(index,value)}  href="#" key={index} className={ selectIndex==index?'active':''} >{label}</a>
                  })
                }
            </div>
            {accountAddress ? (
              <div
                className="header__wallet__wrapper"
                ref={dropdownRef}
                onClick={() => setDropdownOpen(!isDropdownOpen)}
              >
                <div
                  className="header__wallet header__wallet--logged-in"
                  style={{ background: "#30DFC4" }}
                >
                  <span className="dot" />
                  <span className="text">
                    {addressShortener(accountAddress)}
                  </span>
                </div>
                <div
                  className={classNames("header__wallet__dropdown", {
                    "header__wallet__dropdown--open": isDropdownOpen,
                  })}
                >
                 
                  <div className="header__wallet__disconnect">
                   {/* {t('liquidity_page_title_5_button_6')} {get(providerInfo, "name")}{" "}
                    <a
                      href="#"
                      className="header__wallet__disconnect__link"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                      }}
                    >
                      ({t('liquidity_page_title_5_button_7')})
                    </a> */}
                     <a
                      href="#"
                      className="header__wallet__disconnect__link"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                      }}
                    >
                    <img className="icon" src={walletIcon} />
                    {t('liquidity_page_button_5')}
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="header__wallet header__wallet--logged-out"
                onClick={handleConnect}
                style={{ background: "#30DFC4" }}
              >
                <img className="icon" src={walletIcon} />
                <span className="text">{t('liquidity_page_button_2')}</span>
              </div>
            )}
          </div>
          <div className="header__lang" onClick={isShow}>
              <img src={lang} alt="lang" />
              <span>{langs[selectIndex].short}</span>
              <img className="icon-img" src={dropdown} alt="lang" />
          </div>
        </div>
      </header>
      {stakingPageMatch &&
      stakingContract &&
      !Number(balance) &&
      !Number(totalStaked) ? (
        <AddLiquidity />
      ) : null}
    </div>
  );
};

export default withRouter(NavBar);
