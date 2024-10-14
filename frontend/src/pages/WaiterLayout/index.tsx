// import React from "react";

import { Outlet } from "react-router";
import { Container } from "./styles";
import WaiterMenu from "../../components/WaiterMenu";

function WaiterLayout() {
  return (
    <Container>
      <WaiterMenu />
      <Outlet />
    </Container>
  );
}

export default WaiterLayout;
