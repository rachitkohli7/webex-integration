import '@webex/components/dist/css/webex-components.css';
import '@momentum-ui/core/css/momentum-ui.min.css';

import React, {useEffect, useState} from 'react';
import Webex from 'webex';
import WebexSDKAdapter from '@webex/sdk-component-adapter';
import {WebexAvatar, WebexDataProvider} from '@webex/components';

const webex = new Webex({
  credentials: `OTVjMWVlYmYtNDc4MS00NTdhLThjZGEtOGU0NmIyOTMyMGFmNzk0YWI3MWQtMDA4_PF84_consumer`,
});
const adapter = new WebexSDKAdapter(webex);

function App() {
  const [adapterConnected, setAdapterConnected] = useState(false);

  useEffect(() => {
    // This is the suggested way to do async hooks.
    // Ref: https://github.com/facebook/react/issues/14326
    async function doConnect() {
      // Wait for the adapter to connect before rendering.
      await adapter.connect();
      console.log(adapter)
      setAdapterConnected(true);
    }

    doConnect();

    // On teardown, disconnect the adapter
    return () => {
      adapter.disconnect();
    }
  }, []);


  return (
    <div className="App">
      {
        adapterConnected && (
          <WebexDataProvider adapter={adapter} >
            <WebexAvatar personID="Y2lzY29zcGFyazovL3VzL1BFT1BMRS9kNDI2YjI2ZS05OGU1LTRhOTctODA2ZC1mMGY1MmE1MmQ5OTk" />
          </WebexDataProvider>
        )
      }
    </div>
  );
}

export default App;
