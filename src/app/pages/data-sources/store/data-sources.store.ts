import { atom } from 'jotai';

// data sources connection
export const facebookDataConnection = atom({
  name: 'Facebook', connected: false
})
export const twitterDataConnection = atom({
  name: 'Twitter', connected: true
})
export const googleDataConnection = atom({
  name: 'Google', connected: true
})
export const instagramDataConnection = atom({
  name: 'Instagram', connected: true
})
export const linkedinDataConnection = atom({
  name: 'LinkedIn', connected: true
})
export const redditDataConnection = atom({
  name: 'Reddit', connected: true
})
export const tiktokDataConnection = atom({
  name: 'Tiktok', connected: true
})
export const appleDataConnection = atom({
  name: 'Apple', connected: true
})
export const amazonDataConnection = atom({
  name: 'Amazon', connected: true
})
export const snapchatDataConnection = atom({
  name: 'Snapchat', connected: true
})

// confirmation dialog
export const confirmationDialogVisibility = atom(false);
export const confirmationDialogTitle = atom('');
export const confirmationDialogMessage = atom('');
export const confirmationDialogButtonTitle = atom('');
export const confirmationDialogCurrentDataSource = atom('');