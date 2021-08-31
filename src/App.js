import { Fragment } from "react";
import NavBar from "./components/navbar";
import { Routes } from "./components/routes";

export default () => {
  return (
    <Fragment>
        <div>
          <NavBar />
          <Routes />
        </div>
    </Fragment>
  );
};