// import React from "react";

import { Outlet } from "react-router";
import Menu from "../../components/Menu";
import { Container } from "./styles";

function Layout() {
  return (
    <Container>
      <Menu />
      <Outlet />
    </Container>
  );
}

export default Layout;
