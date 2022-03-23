import React, { Component } from "react";
import "./Popup.css";
import { useTranslation } from 'react-i18next';

import Members from "./Members";

const Popup = (props) => {

  const { t } = useTranslation();


  return props.trigger ? (
    <div className="popup" style={{overflowY:"scroll"}}>
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
        {t('Done')}
        </button>
        {props.children}

        <Members
          task={props.task}
          addMembers={props.addMembers}
          setMembers={props.setMembers}
          members={props.members}
          listTitle={props.listTitle}
          removeMembers={props.removeMembers}

        />
      </div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
