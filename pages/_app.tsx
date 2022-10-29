import { useState } from "react";

import "../styles/globals.scss";

import type { AppProps } from "next/app";

import Main from "../components/Main";
import Loading from "../components/Loading";

import { Context } from "../context";

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  function handleLoading(state: boolean) {
    setLoading(state);
  }
  return (
    <Context.Provider value={{ loading, handleLoading }}>
      <Main>
        <Component {...pageProps} />
        {loading && <Loading />}
      </Main>
    </Context.Provider>
  );
}
