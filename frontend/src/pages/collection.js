import React, { useState, useContext } from "react";
import Sticker from "../components/sticker";
import api from "../services/api";
import { useRouter } from "next/router";
import { Plus } from "../icons";
import { UserContext } from "../components/context/context";

export default function Collection({ data, error }) {
  const { user } = useContext(UserContext);

  const [stickers, setStickers] = useState((data && data.stickers) || []);
  const [errorFetchStickers, setErrorFetchStickers] = useState(
    data ? null : error
  );

  const [stickerNumber, setStickerNumber] = useState("");
  const [errorAddSticker, setErrorAddSticker] = useState(false);

  const [errorDeleteSticker, setErrorDeleteSticker] = useState(
    new Array(stickers.length)
  );

  const router = useRouter();

  async function addSticker() {
    if (stickerNumber) {
      try {
        await api.post(`/api/userStickers/${stickerNumber}`, null, {
          withCredentials: true,
        });

        setErrorAddSticker(false);

        setStickers((prevState) => {
          const newState = [];
          let added = false;

          prevState.forEach((entry) => {
            if (entry <= stickerNumber) {
              newState.push(entry);
            } else {
              if (!added) {
                newState.push(stickerNumber);
                added = true;
              }

              newState.push(entry);
            }
          });

          if (!added) {
            newState.push(stickerNumber);
            added = true;
          }

          return newState;
        });

        setStickerNumber("");
      } catch (err) {
        console.log(err.response.data);
        setErrorAddSticker(true);
      }
    }
  }

  async function deleteSticker(stickerIndex, stickerNumber) {
    try {
      await api.delete(`/api/userStickers/${stickerNumber}`, {
        withCredentials: true,
      });

      setStickers((prevState) => {
        const newStickers = [];
        let removed = false;

        prevState.forEach((entry) => {
          if (entry == stickerNumber && !removed) {
            removed = true;
          } else {
            newStickers.push(entry);
          }
        });

        return newStickers;
      });
    } catch (err) {
      console.log(err.response.data);
      setErrorDeleteSticker((prevState) =>
        prevState.map((entry, index) => (index == stickerIndex ? true : entry))
      );
    }
  }

  if (!user) {
    router.push("/login");
    return null;
  } else {
    return (
      <div className="collection">
        <div className="collection__grid">
          <div className="collection__headerBox">
            <div className="coolHeading coolHeading--medium">Minha coleção</div>
          </div>
          <div className="collection__addBox">
            <a onClick={addSticker} className="collection__addBtn">
              <div className="collection__addBtn--icon">
                <Plus />
              </div>
              <input
                type="text"
                placeholder="Número"
                value={stickerNumber}
                onChange={(e) => setStickerNumber(e.target.value)}
              />
            </a>
          </div>
          <div className="collection__contentBox">
            {stickers.map((sticker, index) => (
              <Sticker
                deleteFunction={() => deleteSticker(index, sticker)}
                key={index}
                number={sticker}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export async function getServerSideProps({ req }) {
  return api
    .get("/api/userStickers/", {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie,
      },
    })
    .then((response) => {
      const stickers = [];

      if (response.data) {
        response.data.forEach((sticker) => {
          for (let i = 0; i < sticker.amount; i++) {
            stickers.push(sticker.Sticker.number);
          }
        });
      }

      return {
        props: {
          data: { stickers },
        },
      };
    })
    .catch((err) => ({
      props: {
        error: err.response ? err.response.data : true,
      },
    }));
}
