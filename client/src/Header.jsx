import React, { useEffect, useState } from "react";
import { useTelegram } from "./useTelegram";
import "./Header.css";

const Header = () => {
  const { onClose, user, onToggleButton, tg } = useTelegram();
  const [message, setMessage] = useState("");

  const openScan = () => {
    tg.showScanQrPopup({ text: "Отсканируй-ка код!!!" }, () => {});
  };

  const openRequestContact = () => {
    tg.requestContact();
  };

  const openRequestAccess = () => {
    tg.BiometricManager.requestAccess({ reason: "I need it!!" }, () => {
      if (tg.BiometricManager.isAccessRequested) {
        setMessage("Access approved");
      } else {
        setMessage("Access Rejected");
      }
    });
  };

  const openRequestFaceId = () => {
    tg.BiometricManager.authenticate({ reason: "I need it!!" }, () => {
      if (tg.BiometricManager.isAccessGranted) {
        setMessage("It's you!");
      } else {
        setMessage("It's not you!");
      }
    });
  };

  const openfaceSettings = () => {
    tg.BiometricManager.openSettings(); //todo Note that this method can be called only in response to user interaction with the Mini App interface (e.g. a click inside the Mini App or on the main button)

  };

  useEffect(() => {
    tg.BiometricManager.init();
  }, []);

  useEffect(() => {
    tg.SettingsButton.show();
  }, []);

  return (
    <div className="header">
      <section style={{ display: "flex", flexWrap: "wrap" }}>
        <button onClick={onToggleButton}>Toggle</button>
        <button onClick={onClose}>Close</button>
        <button onClick={openScan}>Scan</button>
        <button onClick={openRequestContact}>Request Contact</button>
        <button onClick={openRequestAccess}>Request Access FaceID</button>

        <button onClick={openRequestFaceId}>Request FaceID</button>
        <button onClick={openfaceSettings}>FaceID Settings</button>

        <h1>{tg.BiometricManager.isInited ? "true" : "false"}</h1>
      </section>
      <h1>Hello {user?.username}</h1>
      <h2>{message}</h2>
    </div>
  );
};

export default Header;
