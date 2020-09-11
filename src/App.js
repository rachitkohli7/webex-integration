import '@webex/components/dist/css/webex-components.css';
import '@momentum-ui/core/css/momentum-ui.min.css';

import React, {useEffect, useState} from 'react';
import Webex from 'webex';
import { extractToken } from './utils/userTokenGet';

const authUrl = 'https://webexapis.com/v1/authorize?client_id=Ced19080ba49d2429f6a26b28cc95849f2bc254f97294d49fef93c02999987b5f&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000&scope=spark-compliance%3Amemberships_read%20spark-admin%3Aresource_groups_read%20meeting%3Arecordings_read%20spark%3Aall%20meeting%3Apreferences_write%20spark-admin%3Apeople_write%20spark-admin%3Aorganizations_read%20spark-admin%3Aplaces_read%20meeting%3Aschedules_write%20spark-compliance%3Ateam_memberships_read%20spark-compliance%3Ateam_memberships_write%20spark-admin%3Adevices_read%20spark-admin%3Ahybrid_clusters_read%20spark-compliance%3Amessages_read%20spark-admin%3Adevices_write%20meeting%3Aschedules_read%20spark-compliance%3Amemberships_write%20identity%3Aplaceonetimepassword_create%20spark-admin%3Aroles_read%20meeting%3Arecordings_write%20meeting%3Apreferences_read%20spark-admin%3Aresource_group_memberships_read%20spark-compliance%3Aevents_read%20spark-admin%3Aresource_group_memberships_write%20spark-compliance%3Arooms_read%20spark-admin%3Acall_qualities_read%20spark-compliance%3Amessages_write%20spark%3Akms%20audit%3Aevents_read%20spark-admin%3Ahybrid_connectors_read%20spark-compliance%3Ateams_read%20spark-admin%3Aplaces_write%20spark-admin%3Alicenses_read%20spark-admin%3Apeople_read&state=set_state_here'
const clientSecret = 'e92eab9b00db1b1e89d1c34a603582b61ea18223aa39ffc12d07a9ad4552aaf3';
const credentials = {
    authorizationString: authUrl,
    client_secret: clientSecret
};

function App() {
  const [webexInstance, setWebexInstance] = useState(null);
  const redirectUrl = authUrl;
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    console.log('heyya ut:', userToken);
    if (userToken && webexInstance) {
        webexInstance.people.get(userToken).then((data) => {
          console.log(data);
        }
      ).catch((err) => {
        console.log(err)
      });
    }
  }, [userToken])

  useEffect(() => {
    const storedUserToken = sessionStorage.getItem('webexUserToken');
    if (!storedUserToken) {
      const windowData = window.location;
      const userToken = extractToken(windowData.href);
      if (userToken) {
        setUserToken(userToken);
        sessionStorage.setItem('webexUserToken', userToken);
      }
    } else {
      setUserToken(userToken);
    }

    const webexClient = sessionStorage.getItem('webexClient');
    let webex;
    if (webexClient) {
      webex = webexClient;
      setWebexInstance(webex);
    } else {
      webex = Webex.init({
        config: {
          credentials
        }
      });
      setWebexInstance(webex);
      console.log('storing session')
      sessionStorage.setItem('webexClient', webex);
    }
    console.log('rachit:',webex)
  }, []);

  const authorize = () => {
    window.open(redirectUrl, '_self', `toolbar=no, location=no, directories=no, status=no, menubar=no,
    scrollbars=no, resizable=no, copyhistory=no, width=${500},
    height=${5000}, top=${300}, left=${300}`)
  }

  const logout = () => {
    console.log('logout')
  }

  return (
    <div className="App">
      <button onClick={authorize}>Authorize</button>
      <div/>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default App;
