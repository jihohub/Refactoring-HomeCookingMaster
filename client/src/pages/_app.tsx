import React, { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "react-query/devtools";
// import "../styles.module.css";

import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const [queryClient] = React.useState(() => new QueryClient());
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

  // return getLayout(<Component {...pageProps} />);
// }

export default MyApp;
