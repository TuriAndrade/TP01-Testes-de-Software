import React, { useState, useContext } from "react";
import { UserContext } from "../components/context/context";
import UserCard from "../components/userCard";
import { useRouter } from "next/router";
import api from "../services/api";
import Link from "next/link";

export default function Exchange({ data, error }) {
  const { user } = useContext(UserContext);

  const router = useRouter();

  const [users, setUsers] = useState((data && data.users) || []);
  const [errorFetchUsers, setErrorFetchUsers] = useState(data ? null : error);

  if (user) {
    return (
      <div className="exchange">
        <div className="exchange__grid">
          <div className="exchange__headerBox">
            <div className="coolHeading coolHeading--medium">
              Selecionar Usuário
            </div>
          </div>
          {users.map((user, index) =>
            user.nAvaliable > 0 ? (
              <Link
                key={index}
                href="/exchange/user/[id]"
                as={`/exchange/user/${user.id}`}
              >
                <a className="exchange__userLink">
                  <UserCard name={user.name} nAvaliable={user.nAvaliable} />
                </a>
              </Link>
            ) : null
          )}
        </div>
      </div>
    );
  } else {
    router.push("/login");
    return null;
  }
}

export async function getServerSideProps({ req }) {
  try {
    const users = await api
      .get("/api/users/", {
        withCredentials: true,
        headers: {
          Cookie: req.headers.cookie,
        },
      })
      .then(({ data }) => data);

    const exchangePairs = await Promise.all(
      users.map((user) =>
        api
          .get(`/api/userStickers/exchange/${user.id}`, {
            withCredentials: true,
            headers: {
              Cookie: req.headers.cookie,
            },
          })
          .then(({ data }) => ({
            ...user,
            ...data,
          }))
      )
    );

    return {
      props: {
        data: {
          users: exchangePairs,
        },
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
