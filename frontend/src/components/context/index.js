import React from "react";
import useSWR from "swr";
import { UserContext } from "./context";
import authenticate from "./authenticate";

export default function Context(props) {
  const {
    data: finished,
    error: userError,
    mutate: mutateUser,
  } = useSWR(
    {
      url: "/api/users/authenticate",
      args: { withCredentials: true },
    },
    authenticate
  );

  return (
    <UserContext.Provider
      value={{
        user: !userError,
        userError,
        mutateUser,
        loadingUser: !finished && !userError,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
