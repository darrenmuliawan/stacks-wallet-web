import { useAtom } from "jotai"
import { useAtomValue } from "jotai/utils";
import { amazonDataConnection, appleDataConnection, facebookDataConnection, googleDataConnection, instagramDataConnection, linkedinDataConnection, redditDataConnection, snapchatDataConnection, tiktokDataConnection, twitterDataConnection } from "../store/data-sources.store"

// data sources objects
export const getDataSourcesListState = () => {
  // facebook
  const [facebookConnection, setFacebookConnection] = useAtom(facebookDataConnection);
  const toggleFacebookConnection = () => {
    const checked = facebookConnection.connected;
    setFacebookConnection({
      name: 'facebook',
      connected: !checked
    })
  }
  const facebook = {
    name: facebookConnection.name,
    connected: facebookConnection.connected,
    onClick: toggleFacebookConnection
  }

  // twitter
  const [twitterConnection, setTwitterConnection] = useAtom(twitterDataConnection);
  const toggleTwitterConnection = () => {
    const checked = twitterConnection.connected;
    setTwitterConnection({
      name: 'twitter',
      connected: !checked
    })
  }
  const twitter = {
    name: twitterConnection.name,
    connected: twitterConnection.connected,
    onClick: toggleTwitterConnection
  }

  // google
  const [googleConnection, setGoogleConnection] = useAtom(googleDataConnection);
  const toggleGoogleConnection = () => {
    const checked = googleConnection.connected;
    setGoogleConnection({
      name: 'google',
      connected: !checked
    })
  }
  const google = {
    name: googleConnection.name,
    connected: googleConnection.connected,
    onClick: toggleGoogleConnection
  }

  // instagram
  const [instagramConnection, setInstagramConnection] = useAtom(instagramDataConnection);
  const toggleInstagramConnection = () => {
    const checked = instagramConnection.connected;
    setInstagramConnection({
      name: 'instagram',
      connected: !checked
    })
  }
  const instagram = {
    name: instagramConnection.name,
    connected: instagramConnection.connected,
    onClick: toggleInstagramConnection
  }

  // linkedin
  const [linkedinConnection, setLinkedinConnection] = useAtom(linkedinDataConnection);
  const toggleLinkedinConnection = () => {
    const checked = linkedinConnection.connected;
    setLinkedinConnection({
      name: 'linkedin',
      connected: !checked
    })
  }
  const linkedin = {
    name: linkedinConnection.name,
    connected: linkedinConnection.connected,
    onClick: toggleLinkedinConnection
  }

  // reddit
  const [redditConnection, setRedditConnection] = useAtom(redditDataConnection);
  const toggleRedditConnection = () => {
    const checked = redditConnection.connected;
    setRedditConnection({
      name: 'reddit',
      connected: !checked
    })
  }
  const reddit = {
    name: redditConnection.name,
    connected: redditConnection.connected,
    onClick: toggleRedditConnection
  }

  // tiktok
  const [tiktokConnection, setTiktokConnection] = useAtom(tiktokDataConnection);
  const toggleTiktokConnection = () => {
    const checked = tiktokConnection.connected;
    setTiktokConnection({
      name: 'tiktok',
      connected: !checked
    })
  }
  const tiktok = {
    name: tiktokConnection.name,
    connected: tiktokConnection.connected,
    onClick: toggleTiktokConnection
  }

  // apple
  const [appleConnection, setAppleConnection] = useAtom(appleDataConnection);
  const toggleAppleConnection = () => {
    const checked = appleConnection.connected;
    setAppleConnection({
      name: 'apple',
      connected: !checked
    })
  }
  const apple = {
    name: appleConnection.name,
    connected: appleConnection.connected,
    onClick: toggleAppleConnection
  }

  // amazon
  const [amazonConnection, setAmazonConnection] = useAtom(amazonDataConnection);
  const toggleAmazonConnection = () => {
    const checked = amazonConnection.connected;
    setAmazonConnection({
      name: 'amazon',
      connected: !checked
    })
  }
  const amazon = {
    name: amazonConnection.name,
    connected: amazonConnection.connected,
    onClick: toggleAmazonConnection
  }

  // snapchat
  const [snapchatConnection, setSnapchatConnection] = useAtom(snapchatDataConnection);
  const toggleSnapchatConnection = () => {
    const checked = snapchatConnection.connected;
    setSnapchatConnection({
      name: 'snapchat',
      connected: !checked
    })
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

export const useFacebookConnectionCheckedState = () => {
  const [facebookConnection, setFacebookConnection] = useAtom(facebookDataConnection);
  const setFacebookConnectionChecked = (checked: boolean) => {
    setFacebookConnection({
      name: 'facebook',
      connected: checked
    })
  }

  return [facebookConnection, setFacebookConnectionChecked]
}