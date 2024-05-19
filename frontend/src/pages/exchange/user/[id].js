import React, { useState, useContext } from "react";
import api from "../../../services/api";
import { useRouter } from "next/router";
import { UserContext } from "../../../components/context/context";
import StickerSelect from "../../../components/stickerSelect";
import { ArrowRight2, ArrowLeft2 } from "../../../icons";

export default function ExchangeUser({ data, error, query }) {
  const { user } = useContext(UserContext);

  const router = useRouter();

  const [nAvaliable, setNAvaliable] = useState(
    (data && data.exchange && data.exchange.nAvaliable) || 0
  );

  const [nWanted, setNWanted] = useState(
    (data && data.exchange && data.exchange.nWanted) || 0
  );

  const [nOffered, setNOffered] = useState(
    (data && data.exchange && data.exchange.nOffered) || 0
  );

  const [wantedAvaliable, setWantedAvaliable] = useState(
    (data && data.exchange && data.exchange.wanted) || []
  );
  const [offeredAvaliable, setOfferedAvaliable] = useState(
    (data && data.exchange && data.exchange.offered) || []
  );
  const [errorFetchExchange, setErrorFetchExchange] = useState(
    data ? null : error
  );

  const [errorExchange, setErrorExchange] = useState(null);

  const [wantedSelected, setWantedSelected] = useState([...Array(nWanted)]);
  const [offeredSelected, setOfferedSelected] = useState([...Array(nOffered)]);

  const [page, setPage] = useState("offered");

  function toggleOffered(stickerIndex, sticker) {
    setOfferedSelected((prevstate) =>
      prevstate.map((entry, index) =>
        index == stickerIndex ? (entry ? null : sticker) : entry
      )
    );
  }

  function toggleWanted(stickerIndex, sticker) {
    setWantedSelected((prevstate) =>
      prevstate.map((entry, index) =>
        index == stickerIndex ? (entry ? null : sticker) : entry
      )
    );
  }

  function isExchangePossible() {
    const nWanted = wantedSelected.filter((entry) => !!entry).length;
    const nOffered = offeredSelected.filter((entry) => !!entry).length;

    return nWanted > 0 && nWanted == nOffered;
  }

  async function handleExchange() {
    try {
      const wantedStickers = wantedSelected.filter((entry) => !!entry);
      const offeredStickers = offeredSelected.filter((entry) => !!entry);

      await api.post(
        "/api/notifications",
        {
          to: parseInt(query.id),
          offeredStickers,
          wantedStickers,
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err.response.data);
      setErrorExchange((err.response && err.response.data) || true);
    }
  }

  if (user) {
    return (
      <div className="exchangeUser">
        <div className="exchangeUser__grid">
          {page == "offered" ? (
            <>
              <div className="exchangeUser__headerBox">
                <div className="coolHeading coolHeading--medium">
                  Oferecer Figurinhas
                </div>
              </div>
              <div className="exchangeUser__contentBox">
                {offeredAvaliable.map((sticker, index) => (
                  <StickerSelect
                    onClick={() => toggleOffered(index, sticker.Sticker.number)}
                    selected={!!offeredSelected[index]}
                    key={index}
                    number={sticker.Sticker.number}
                    inactive={
                      !offeredSelected[index] &&
                      offeredSelected.filter((entry) => !!entry).length >=
                        nAvaliable
                    }
                  />
                ))}
              </div>
              <div className="exchangeUser__pageBtnBox">
                <a onClick={() => setPage("wanted")} className="btnPrimary">
                  <div className="btnPrimary__text">
                    <ArrowRight2 />
                  </div>
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="exchangeUser__headerBox">
                <div className="coolHeading coolHeading--medium">
                  Escolher Figurinhas
                </div>
              </div>
              <div className="exchangeUser__contentBox">
                {wantedAvaliable.map((sticker, index) => (
                  <StickerSelect
                    onClick={() => toggleWanted(index, sticker.Sticker.number)}
                    selected={!!wantedSelected[index]}
                    key={index}
                    number={sticker.Sticker.number}
                    inactive={
                      !wantedSelected[index] &&
                      wantedSelected.filter((entry) => !!entry).length >=
                        nAvaliable
                    }
                  />
                ))}
              </div>
              <div className="exchangeUser__pageBtnBox">
                <a onClick={() => setPage("offered")} className="btnPrimary">
                  <div className="btnPrimary__text">
                    <ArrowLeft2 />
                  </div>
                </a>
              </div>
              <div className="exchangeUser__submitBtnBox">
                <a
                  onClick={handleExchange}
                  className={
                    isExchangePossible()
                      ? "btnPrimary"
                      : "btnPrimary uDisabledBtn"
                  }
                >
                  <div className="btnPrimary__text">Fazer proposta</div>
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    );
  } else {
    router.push("/login");
    return null;
  }
}

export async function getServerSideProps({ req, query }) {
  try {
    const exchange = await api
      .get(`/api/userStickers/exchange/${query.id}`, {
        withCredentials: true,
        headers: {
          Cookie: req.headers.cookie,
        },
      })
      .then(({ data }) => data);

    return {
      props: {
        data: { exchange },
        query,
      },
    };
  } catch (err) {
    return {
      props: {
        error: err.response ? err.response.data : true,
      },
    };
  }
}
