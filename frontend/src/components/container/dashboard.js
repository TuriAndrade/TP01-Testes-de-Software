import React, { useState, useContext } from "react";
import Logo from "../logo";
import Link from "next/link";
import Popup from "./popup";
import api from "../../services/api";
import { UserContext } from "../context/context";

export default function DashboardContainer({ children }) {
  const { mutateUser } = useContext(UserContext);

  const [popupIn, setPopupIn] = useState(false);

  const [errorLogout, setErrorLogout] = useState(null);

  async function logout() {
    try {
      await api.post("/api/users/logout", null, { withCredentials: true });
      setErrorLogout(false);
      mutateUser();
    } catch (e) {
      console.log(e.response);
      setErrorLogout(true);
    }
  }

  return (
    <div className="container">
      <div className="container__grid container__grid--dashboard">
        <div className="container__navbarBox container__navbarBox--logo">
          <Link href="/" passHref legacyBehavior>
            <a className="uDontDecorate">
              <Logo size={"small"} />
            </a>
          </Link>
        </div>
        <div className="container__navbarBox container__navbarBox--dashboard">
          <a
            onClick={() => setPopupIn((prevState) => !prevState)}
            className="textBtn textBtn--mobileActive"
          >
            <div className="textBtn__text">Dashboard</div>
            <div className="textBtn__background"></div>
          </a>
          <Popup popupIn={popupIn} setPopupIn={setPopupIn} />
        </div>
        <div className="container__navbarBox container__navbarBox--profile">
          <Link href="/profile" passHref legacyBehavior>
            <a className="textBtn textBtn--mobileActive">
              <div className="textBtn__text">Perfil</div>
              <div className="textBtn__background"></div>
            </a>
          </Link>
        </div>
        <div className="container__navbarBox container__navbarBox--logout">
          <a onClick={logout} className="textBtn textBtn--mobileActive">
            <div className="textBtn__text">Logout</div>
            <div className="textBtn__background"></div>
          </a>
        </div>
        <div className="container__contentBox">{children}</div>
      </div>
    </div>
  );
}
