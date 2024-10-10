// import React from "react";

import { Outlet } from "react-router";
import { Container } from "./styles";
import NavigationMenu from "../../components/NavigationMenu";

function CustomerLayout() {
  return (
    <Container>
      <NavigationMenu />
      <Outlet />
    </Container>
  );
}

export default CustomerLayout;
