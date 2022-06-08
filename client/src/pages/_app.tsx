import React, { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import Layout from "../components/Common/Layout";

// import "../styles.module.css";

import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  );
}

  // return getLayout(<Component {...pageProps} />);
// }

export default MyApp;
