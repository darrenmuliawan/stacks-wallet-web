export const convertBirthdateToString = (date: { year: number, month: number, day: number }) => {
  const { year, month, day } = date;
  return `${month}/${day}/${year}`
}

export const buildConfirmationDialogMessage = (source: string) => {
  return `Notice! You are granting access to your data from ${source}, TRUBIT will receive: your public profile, likes, status updates, export stream, read insights, ad interests, and email address.`
}