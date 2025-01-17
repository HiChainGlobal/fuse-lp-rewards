import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import InfoIcon from "@/components/common/InfoIcon.jsx";
import InfoIconHover from "@/components/common/InfoIconHover.jsx";
import { useCountUp } from "react-countup";
import ReactModal from "react-modal";
import { useModal } from "react-modal-hook";
import { formatNumber } from "@/utils/format";
import InfoIconModal from "@/assets/images/info-icon-modal.svg";
import { useTranslation } from "react-i18next";
export default ({
  Icon,
  name,
  title,
  end,
  withSymbol = true,
  modalText,
  symbol,
  link,
  decimals,
  format = true,
}) => {
  let { t } = useTranslation();
  const { accountAddress } = useSelector((state) => state.network);
  const [isHover, setHover] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const { countUp, start, update } = useCountUp({
    end,
    decimals,
    ...(format && { formattingFn: formatNumber }),
  });

  const [showModal] = useModal(
    () => (
      <ReactModal
        isOpen={modalStatus}
        overlayClassName="modal__overlay"
        className="modal__content"
      >
        <div className="info-modal">
          <div className="image">
            <img src={InfoIconModal} />
          </div>
          <div className="title">
            {t("liquidity_page_title_4_?_11")}“{title}”
            {/* {t('liquidity_page_title_5_title_2')} */}
          </div>
          <div className="text">{modalText}</div>
          <button
            style={{ background: "#30DFC4" }}
            className="close"
            onClick={() => {
              setModalStatus(false);
            }}
          >
            {t("liquidity_page_button_4")}
          </button>
        </div>
      </ReactModal>
    ),
    [modalStatus]
  );

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    update(end);
  }, [end]);

  return (
    <div
      className={classNames(
        "info_box",
        { [`info_box--${name}`]: name && accountAddress },
        { "info_box--disabled": !accountAddress }
      )}
    >
      <div className="icons">
        <Icon />
        <div
          onClick={() => {
            showModal();
            setModalStatus(true);
          }}
          className="item"
          onMouseEnter={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
        >
          {isHover && accountAddress ? (
            <InfoIconHover fill="#7E8AB4" />
          ) : (
            <InfoIcon fill={accountAddress ? "#7E8AB4" : "#B2BCC4"} />
          )}
        </div>
      </div>
      <div>
        {withSymbol ? (
          <div
            className={classNames("info_box__value", {
              "info_box__value--disabled": !accountAddress,
            })}
          >
            {countUp > 0 ? countUp : 0}&nbsp;
            {link ? (
              <a rel="noreferrer noopener" target="_blank" href={link}>
                {symbol}
              </a>
            ) : (
              <span>{symbol}</span>
            )}
          </div>
        ) : (
          <div
            className={classNames("info_box__value", {
              "info_box__value--disabled": !accountAddress,
            })}
          >
            {countUp} %
          </div>
        )}
        <div
          className={classNames("info_box__title", {
            "info_box__title--disabled": !accountAddress,
          })}
        >
          {title}
        </div>
      </div>
    </div>
  );
};
