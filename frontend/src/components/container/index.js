import React, { useContext } from "react";
import DefaultContainer from "./default";
import DashboardContainer from "./dashboard";
import LoadingPage from "../loadingPage";
import { UserContext } from "../context/context";

export default function Container(props) {
  const { user, loadingUser } = useContext(UserContext);

  return loadingUser ? (
    <DefaultContainer loadingUser={true}>
      <LoadingPage />
    </DefaultContainer>
  ) : !user ? (
    <DefaultContainer>{props.children}</DefaultContainer>
  ) : (
    <DashboardContainer>{props.children}</DashboardContainer>
  );
}
