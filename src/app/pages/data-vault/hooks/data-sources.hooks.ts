import { atom, useAtom } from "jotai"
import { amazonDataConnection, appleDataConnection, confirmationDialogButtonTitle, confirmationDialogCurrentDataSource, confirmationDialogMessage, confirmationDialogTitle, confirmationDialogVisibility, facebookDataConnection, googleDataConnection, instagramDataConnection, linkedinDataConnection, redditDataConnection, snapchatDataConnection, tiktokDataConnection, twitterDataConnection } from "../store/data-sources.store"

// data sources objects
export const getDataSourcesListState = () => {
  // confirmation dialog state
  const [, setConfirmationDialogVisibility] = useConfirmationDialogVisibilityState();
  const [, setConfirmationDialogTitle] = useConfirmationDialogTitleState();
  const [, setConfirmationDialogMessage] = useConfirmationDialogMessageState();
  const [, setConfirmationDialogButtonTitle] = useConfirmationDialogButtonTitleState();
  const [, setConfirmationDialogCurrentDataSource] = useConfirmationDialogCurrentDataSourceState();

  // facebook
  const [facebookConnection, ] = useAtom(facebookDataConnection);

  const toggleFacebookConnection = () => {
    const checked = facebookConnection.connected;
    setConfirmationDialogVisibility(true);
    setConfirmationDialogCurrentDataSource(facebookConnection.name);

    if (checked) {
      setConfirmationDialogButtonTitle('Disconnect')
      setConfirmationDialogTitle(`Disconnect from ${facebookConnection.name}`)
      setConfirmationDialogMessage(`Do you want to disconnect your data from ${facebookConnection.name}?`)
    } else {
      setConfirmationDialogButtonTitle('Connect')
      setConfirmationDialogTitle(`Connect to ${facebookConnection.name}`)
      setConfirmationDialogMessage(`Do you want to connect your data from ${facebookConnection.name}?`)
    }
  }

  const facebook = {
    name: facebookConnection.name,
    connected: facebookConnection.connected,
    onClick: toggleFacebookConnection,
  }

  // twitter
  const [twitterConnection, ] = useAtom(twitterDataConnection);
  const toggleTwitterConnection = () => {
    const checked = twitterConnection.connected;
    setConfirmationDialogVisibility(true);
    setConfirmationDialogCurrentDataSource(twitterConnection.name);

    if (checked) {
      setConfirmationDialogButtonTitle('Disconnect')
      setConfirmationDialogTitle(`Disconnect from ${twitterConnection.name}`)
      setConfirmationDialogMessage(`Do you want to disconnect your data from ${twitterConnection.name}?`)
    } else {
      setConfirmationDialogButtonTitle('Connect')
      setConfirmationDialogTitle(`Connect to ${twitterConnection.name}`)
      setConfirmationDialogMessage(`Do you want to connect your data from ${twitterConnection.name}?`)
    }
  }
  const twitter = {
    name: twitterConnection.name,
    connected: twitterConnection.connected,
    onClick: toggleTwitterConnection
  }

  // google
  const [googleConnection, ] = useAtom(googleDataConnection);
  const toggleGoogleConnection = () => {
    const checked = googleConnection.connected;
    setConfirmationDialogVisibility(true);
    setConfirmationDialogCurrentDataSource(googleConnection.name);

    if (checked) {
      setConfirmationDialogButtonTitle('Disconnect')
      setConfirmationDialogTitle(`Disconnect from ${googleConnection.name}`)
      setConfirmationDialogMessage(`Do you want to disconnect your data from ${googleConnection.name}?`)
    } else {
      setConfirmationDialogButtonTitle('Connect')
      setConfirmationDialogTitle(`Connect to ${googleConnection.name}`)
      setConfirmationDialogMessage(`Do you want to connect your data from ${googleConnection.name}?`)
    }
  }
  const google = {
    name: googleConnection.name,
    connected: googleConnection.connected,
    onClick: toggleGoogleConnection
  }

  // instagram
  const [instagramConnection, ] = useAtom(instagramDataConnection);
  const toggleInstagramConnection = () => {
    const checked = instagramConnection.connected;
    setConfirmationDialogVisibility(true);
    setConfirmationDialogCurrentDataSource(instagramConnection.name);

    if (checked) {
      setConfirmationDialogButtonTitle('Disconnect')
      setConfirmationDialogTitle(`Disconnect from ${instagramConnection.name}`)
      setConfirmationDialogMessage(`Do you want to disconnect your data from ${instagramConnection.name}?`)
    } else {
      setConfirmationDialogButtonTitle('Connect')
      setConfirmationDialogTitle(`Connect to ${instagramConnection.name}`)
      setConfirmationDialogMessage(`Do you want to connect your data from ${instagramConnection.name}?`)
    }
  }
  const instagram = {
    name: instagramConnection.name,
    connected: instagramConnection.connected,
    onClick: toggleInstagramConnection
  }

  // linkedin
  const [linkedinConnection, ] = useAtom(linkedinDataConnection);
  const toggleLinkedinConnection = () => {
    const checked = linkedinConnection.connected;
    setConfirmationDialogVisibility(true);
    setConfirmationDialogCurrentDataSource(linkedinConnection.name);

    if (checked) {
      setConfirmationDialogButtonTitle('Disconnect')
      setConfirmationDialogTitle(`Disconnect from ${linkedinConnection.name}`)
      setConfirmationDialogMessage(`Do you want to disconnect your data from ${linkedinConnection.name}?`)
    } else {
      setConfirmationDialogButtonTitle('Connect')
      setConfirmationDialogTitle(`Connect to ${linkedinConnection.name}`)
      setConfirmationDialogMessage(`Do you want to connect your data from ${linkedinConnection.name}?`)
    }
  }
  const linkedin = {
    name: linkedinConnection.name,
    connected: linkedinConnection.connected,
    onClick: toggleLinkedinConnection
  }

  // reddit
  const [redditConnection, ] = useAtom(redditDataConnection);
  const toggleRedditConnection = () => {
    const checked = redditConnection.connected;
    setConfirmationDialogVisibility(true);
    setConfirmationDialogCurrentDataSource(redditConnection.name);

    if (checked) {
      setConfirmationDialogButtonTitle('Disconnect')
      setConfirmationDialogTitle(`Disconnect from ${redditConnection.name}`)
      setConfirmationDialogMessage(`Do you want to disconnect your data from ${redditConnection.name}?`)
    } else {
      setConfirmationDialogButtonTitle('Connect')
      setConfirmationDialogTitle(`Connect to ${redditConnection.name}`)
      setConfirmationDialogMessage(`Do you want to connect your data from ${redditConnection.name}?`)
    }
  }
  const reddit = {
    name: redditConnection.name,
    connected: redditConnection.connected,
    onClick: toggleRedditConnection
  }

  // tiktok
  const [tiktokConnection, ] = useAtom(tiktokDataConnection);
  const toggleTiktokConnection = () => {
    const checked = tiktokConnection.connected;
    setConfirmationDialogVisibility(true);
    setConfirmationDialogCurrentDataSource(tiktokConnection.name);

    if (checked) {
      setConfirmationDialogButtonTitle('Disconnect')
      setConfirmationDialogTitle(`Disconnect from ${tiktokConnection.name}`)
      setConfirmationDialogMessage(`Do you want to disconnect your data from ${tiktokConnection.name}?`)
    } else {
      setConfirmationDialogButtonTitle('Connect')
      setConfirmationDialogTitle(`Connect to ${tiktokConnection.name}`)
      setConfirmationDialogMessage(`Do you want to connect your data from ${tiktokConnection.name}?`)
    }
  }
  const tiktok = {
    name: tiktokConnection.name,
    connected: tiktokConnection.connected,
    onClick: toggleTiktokConnection
  }

  // apple
  const [appleConnection, ] = useAtom(appleDataConnection);
  const toggleAppleConnection = () => {
    const checked = appleConnection.connected;
    setConfirmationDialogVisibility(true);
    setConfirmationDialogCurrentDataSource(appleConnection.name);

    if (checked) {
      setConfirmationDialogButtonTitle('Disconnect')
      setConfirmationDialogTitle(`Disconnect from ${appleConnection.name}`)
      setConfirmationDialogMessage(`Do you want to disconnect your data from ${appleConnection.name}?`)
    } else {
      setConfirmationDialogButtonTitle('Connect')
      setConfirmationDialogTitle(`Connect to ${appleConnection.name}`)
      setConfirmationDialogMessage(`Do you want to connect your data from ${appleConnection.name}?`)
    }
  }
  const apple = {
    name: appleConnection.name,
    connected: appleConnection.connected,
    onClick: toggleAppleConnection
  }

  // amazon
  const [amazonConnection, ] = useAtom(amazonDataConnection);
  const toggleAmazonConnection = () => {
    const checked = amazonConnection.connected;
    setConfirmationDialogVisibility(true);
    setConfirmationDialogCurrentDataSource(amazonConnection.name);

    if (checked) {
      setConfirmationDialogButtonTitle('Disconnect')
      setConfirmationDialogTitle(`Disconnect from ${amazonConnection.name}`)
      setConfirmationDialogMessage(`Do you want to disconnect your data from ${amazonConnection.name}?`)
    } else {
      setConfirmationDialogButtonTitle('Connect')
      setConfirmationDialogTitle(`Connect to ${amazonConnection.name}`)
      setConfirmationDialogMessage(`Do you want to connect your data from ${amazonConnection.name}?`)
    }
  }
  const amazon = {
    name: amazonConnection.name,
    connected: amazonConnection.connected,
    onClick: toggleAmazonConnection
  }

  // snapchat
  const [snapchatConnection, ] = useAtom(snapchatDataConnection);
  const toggleSnapchatConnection = () => {
    const checked = snapchatConnection.connected;
    setConfirmationDialogVisibility(true);
    setConfirmationDialogCurrentDataSource(snapchatConnection.name);

    if (checked) {
      setConfirmationDialogButtonTitle('Disconnect')
      setConfirmationDialogTitle(`Disconnect from ${snapchatConnection.name}`)
      setConfirmationDialogMessage(`Do you want to disconnect your data from ${snapchatConnection.name}?`)
    } else {
      setConfirmationDialogButtonTitle('Connect')
      setConfirmationDialogTitle(`Connect to ${snapchatConnection.name}`)
      setConfirmationDialogMessage(`Do you want to connect your data from ${snapchatConnection.name}?`)
    }
  }
  const snapchat = {
    name: snapchatConnection.name,
    connected: snapchatConnection.connected,
    onClick: toggleSnapchatConnection
  }

  return [
    facebook,
    twitter,
    google,
    instagram,
    linkedin,
    reddit,
    tiktok,
    apple,
    amazon,
    snapchat
  ];
}

export const confirmationDialogConfirmCallback = atom(
  null,
  async (get, set, source) => {
    let success = false;
    if (source === 'Facebook') {
  
      // check current connection status
      let facebookConnection = get(facebookDataConnection);
      if (facebookConnection.connected) {
        // currently connected, need to disconnect
        console.log('disconnecting data source from facebook')

        // todo: add logic here
        success = true;
      } else {
        // currently disconnected, need to connect
        console.log('connecting data source from facebook')
        
        // todo: add logic here
        success = true;
      }
  
      // toggle switch
      if (success) {
        facebookConnection.connected = !facebookConnection.connected;
        set(facebookDataConnection, facebookConnection);
        set(confirmationDialogVisibility, false);
      }
    } else if (source === 'Twitter') {
      // check current connection status
      let twitterConnection = get(twitterDataConnection);
      if (twitterConnection.connected) {
        // currently connected, need to disconnect
        console.log('disconnecting data source from twitter')

        // todo: add logic here
        success = true;
      } else {
        // currently disconnected, need to connect
        console.log('connecting data source from twitter')
        
        // todo: add logic here
        success = true;
      }
  
      // toggle switch
      if (success) {
        twitterConnection.connected = !twitterConnection.connected;
        set(twitterDataConnection, twitterConnection);
        set(confirmationDialogVisibility, false);
      }
    } else if (source === 'Google') {
      // check current connection status
      let googleConnection = get(googleDataConnection);
      if (googleConnection.connected) {
        // currently connected, need to disconnect
        console.log('disconnecting data source from google')

        // todo: add logic here
        success = true;
      } else {
        // currently disconnected, need to connect
        console.log('connecting data source from google')
        
        // todo: add logic here
        success = true;
      }
  
      // toggle switch
      if (success) {
        googleConnection.connected = !googleConnection.connected;
        set(googleDataConnection, googleConnection);
        set(confirmationDialogVisibility, false);
      }
    } else if (source === 'Instagram') {
      // check current connection status
      let instagramConnection = get(instagramDataConnection);
      if (instagramConnection.connected) {
        // currently connected, need to disconnect
        console.log('disconnecting data source from instagram')

        // todo: add logic here
        success = true;
      } else {
        // currently disconnected, need to connect
        console.log('connecting data source from instagram')
        
        // todo: add logic here
        success = true;
      }
  
      // toggle switch
      if (success) {
        instagramConnection.connected = !instagramConnection.connected;
        set(instagramDataConnection, instagramConnection);
        set(confirmationDialogVisibility, false);
      }
    } else if (source === 'LinkedIn') {
      // check current connection status
      let linkedinConnection = get(linkedinDataConnection);
      if (linkedinConnection.connected) {
        // currently connected, need to disconnect
        console.log('disconnecting data source from linkedin')

        // todo: add logic here
        success = true;
      } else {
        // currently disconnected, need to connect
        console.log('connecting data source from linkedin')
        
        // todo: add logic here
        success = true;
      }
  
      // toggle switch
      if (success) {
        linkedinConnection.connected = !linkedinConnection.connected;
        set(linkedinDataConnection, linkedinConnection);
        set(confirmationDialogVisibility, false);
      }
    } else if (source === 'Reddit') {
      // check current connection status
      let redditConnection = get(redditDataConnection);
      if (redditConnection.connected) {
        // currently connected, need to disconnect
        console.log('disconnecting data source from reddit')

        // todo: add logic here
        success = true;
      } else {
        // currently disconnected, need to connect
        console.log('connecting data source from reddit')
        
        // todo: add logic here
        success = true;
      }
  
      // toggle switch
      if (success) {
        redditConnection.connected = !redditConnection.connected;
        set(redditDataConnection, redditConnection);
        set(confirmationDialogVisibility, false);
      }
    } else if (source === 'Tiktok') {
      // check current connection status
      let tiktokConnection = get(tiktokDataConnection);
      if (tiktokConnection.connected) {
        // currently connected, need to disconnect
        console.log('disconnecting data source from tiktok')

        // todo: add logic here
        success = true;
      } else {
        // currently disconnected, need to connect
        console.log('connecting data source from tiktok')
        
        // todo: add logic here
        success = true;
      }
  
      // toggle switch
      if (success) {
        tiktokConnection.connected = !tiktokConnection.connected;
        set(tiktokDataConnection, tiktokConnection);
        set(confirmationDialogVisibility, false);
      }
    } else if (source === 'Apple') {
      // check current connection status
      let appleConnection = get(appleDataConnection);
      if (appleConnection.connected) {
        // currently connected, need to disconnect
        console.log('disconnecting data source from apple')

        // todo: add logic here
        success = true;
      } else {
        // currently disconnected, need to connect
        console.log('connecting data source from apple')
        
        // todo: add logic here
        success = true;
      }
  
      // toggle switch
      if (success) {
        appleConnection.connected = !appleConnection.connected;
        set(appleDataConnection, appleConnection);
        set(confirmationDialogVisibility, false);
      }
    } else if (source === 'Amazon') {
      // check current connection status
      let amazonConnection = get(amazonDataConnection);
      if (amazonConnection.connected) {
        // currently connected, need to disconnect
        console.log('disconnecting data source from amazon')

        // todo: add logic here
        success = true;
      } else {
        // currently disconnected, need to connect
        console.log('connecting data source from amazon')
        
        // todo: add logic here
        success = true;
      }
  
      // toggle switch
      if (success) {
        amazonConnection.connected = !amazonConnection.connected;
        set(amazonDataConnection, amazonConnection);
        set(confirmationDialogVisibility, false);
      }
    } else if (source === 'Snapchat') {
      // check current connection status
      let snapchatConnection = get(snapchatDataConnection);
      if (snapchatConnection.connected) {
        // currently connected, need to disconnect
        console.log('disconnecting data source from snapchat')

        // todo: add logic here
        success = true;
      } else {
        // currently disconnected, need to connect
        console.log('connecting data source from snapchat')
        
        // todo: add logic here
        success = true;
      }
  
      // toggle switch
      if (success) {
        snapchatConnection.connected = !snapchatConnection.connected;
        set(snapchatDataConnection, snapchatConnection);
        set(confirmationDialogVisibility, false);
      }
    }
  }
)

// confirmation dialog
export const useConfirmationDialogTitleState = () => {
  return useAtom(confirmationDialogTitle);
}

export const useConfirmationDialogVisibilityState = () => {
  return useAtom(confirmationDialogVisibility);
}

export const useConfirmationDialogMessageState = () => {
  return useAtom(confirmationDialogMessage);
}

export const useConfirmationDialogButtonTitleState = () => {
  return useAtom(confirmationDialogButtonTitle);
}

export const useConfirmationDialogCurrentDataSourceState = () => {
  return useAtom(confirmationDialogCurrentDataSource);
}