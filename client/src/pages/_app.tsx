import React from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import Layout from "../components/Common/Layout";
import type { AppProps } from "next/app";
import "./styles.scss";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <>
      <meta
        charSet="utf-8"
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <RecoilRoot>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RecoilRoot>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

  // return getLayout(<Component {...pageProps} />);
// }

export default MyApp;
