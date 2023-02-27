import { Suspense } from "react";
import { SWRConfig } from "swr";
import { BrowserRouter as Router } from "react-router-dom";
import { request } from "@app/utils/request";
import { Theme } from "./theme";
import Routes from "./routes";
import CoreLayout from "./layouts";

const App = () => {
  return (
    <>
      <Router>
        <Suspense fallback={<div />}>
          <SWRConfig
            value={{
              fetcher: (resource, init) =>
                request(resource, init).then((res) => res.data),
              revalidateOnFocus: false,
              revalidateOnReconnect: false,
            }}
          >
            <Theme>
              <CoreLayout>
                <Routes />
              </CoreLayout>
            </Theme>
          </SWRConfig>
        </Suspense>
      </Router>
    </>
  );
};

export default App;
