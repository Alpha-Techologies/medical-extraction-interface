export const getExpirationDate = () => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 10);

  // Format the expiration date in the required cookie format
  const expires = expirationDate.toUTCString();
  return expires;
};
