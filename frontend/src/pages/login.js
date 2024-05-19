import { useState, useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { useRouter } from "next/router";
import api from "../services/api";
import ControlledInput from "../components/controlledInput";
import { Home } from "../icons";
import { notNullValidator } from "../utils/validators";
import { UserContext } from "../components/context/context";

export default function Login() {
  const { user, mutateUser } = useContext(UserContext);

  const [errorLogin, setErrorLogin] = useState(null);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(null);

  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(null);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoadingLogin(true);

    const data = {
      email: notNullValidator(email, setErrorEmail),
      password: notNullValidator(password, setErrorPassword),
    };

    if (Object.keys(data).every((entry) => !!data[entry])) {
      try {
        await api.post("/api/users/login", data, {
          withCredentials: true,
        });

        mutateUser();
        setErrorLogin(false);
      } catch (e) {
        console.log(e.response);
        setErrorLogin(true);
      } finally {
        setLoadingLogin(false);
      }
    } else {
      setLoadingLogin(false);
    }
  }

  if (user) {
    router.push("/collection");
    return null;
  } else {
    return (
      <div className="pageFormContainer">
        <div className="pageLettering">
          <div className="pageLettering__heading">
            <div className="pageLettering__heading pageLettering__heading--secondary">
              Entre
            </div>
            <div className="pageLettering__heading pageLettering__heading--primary">
              E se divirta trocando figurinhas e fazendo novos amigos!
            </div>
          </div>
        </div>
        <div className="pageFormContainer__form">
          <form
            onSubmit={handleSubmit}
            className={errorLogin ? "form form--error" : "form"}
          >
            <ControlledInput
              placeholder="Email"
              label="Email"
              type="text"
              state={email}
              setState={setEmail}
              error={errorEmail}
            />
            <ControlledInput
              placeholder="Senha"
              label="Senha"
              type="password"
              state={password}
              setState={setPassword}
              error={errorPassword}
            />
            <div className="form__btnBox form__btnBox--spaceBetween">
              <Home
                onClick={() => router.push("/")}
                className="form__homeBtn"
              />
              <CSSTransition
                in={loadingLogin}
                timeout={400}
                classNames="btnPrimary"
              >
                <button type="submit" className="btnPrimary">
                  <CSSTransition
                    in={loadingLogin}
                    timeout={400}
                    classNames="btnPrimary__text"
                  >
                    <p className="btnPrimary__text">Entrar</p>
                  </CSSTransition>
                  <CSSTransition
                    in={loadingLogin}
                    timeout={400}
                    classNames="btnPrimary__loading"
                    unmountOnExit
                  >
                    <div className="btnPrimary__loading">
                      <div className="loadingBox">
                        <div className="loadingBox__bar loadingBox__bar--1 loadingBox__bar--white"></div>
                        <div className="loadingBox__bar loadingBox__bar--2 loadingBox__bar--white"></div>
                        <div className="loadingBox__bar loadingBox__bar--3 loadingBox__bar--white"></div>
                      </div>
                    </div>
                  </CSSTransition>
                </button>
              </CSSTransition>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
