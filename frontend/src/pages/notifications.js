import React, { useState, useContext, useLayoutEffect } from "react";
import { UserContext } from "../components/context/context";
import { useRouter } from "next/router";
import UserCard from "../components/userCard";
import api from "../services/api";
import Link from "next/link";

export default function Notifications({ data, error }) {
  const { user } = useContext(UserContext);

  const router = useRouter();

  const [notifications, setNotifications] = useState([]);

  const [users, setUsers] = useState([]);

  const [offered, setOffered] = useState([]);

  const [wanted, setWanted] = useState([]);

  const [errorFetchNotifications, setErrorFetchNotifications] = useState(
    data ? null : error
  );

  useLayoutEffect(() => {
    if (data) {
      setNotifications(data.map((entry) => entry.notification));
      setUsers(data.map((entry) => entry.user));
      setOffered(data.map((entry) => entry.offered));
      setWanted(data.map((entry) => entry.wanted));
    }
  }, [data]);

  if (user) {
    return (
      <div className="exchange">
        <div className="exchange__grid">
          <div className="exchange__headerBox">
            <div className="coolHeading coolHeading--medium">
              pedidos de troca
            </div>
          </div>
          {notifications.map((notification, index) => (
            <Link
              key={index}
              href="/notification/view/[id]"
              as={`/notification/view/${notification.id}`}
            >
              <a className="exchange__userLink">
                <UserCard
                  name={users[index].name}
                  nAvaliable={offered[index].length}
                />
              </a>
            </Link>
          ))}
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
    const response = await api
      .get("/api/notifications/", {
        withCredentials: true,
        headers: {
          Cookie: req.headers.cookie,
        },
      })
      .then(({ data }) => data);

    return {
      props: {
        data: response,
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
