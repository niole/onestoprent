import axios from 'axios';

const apiHost = "http://127.0.0.1:10010";

export function getAlertsForLandlord(userId) {
  const url = `${apiHost}/alerts/landlord?landlordUserId=${userId}`;
  return axios(url);
}

export function getAlertsForRenter(userId) {
  const url = `${apiHost}/alerts/landlord?renterUserId=${userId}`;
  return axios(url);
}

export function getMessages(userId) {
  const url = `${apiHost}/messages/to?userId=${userId}`;
  return axios(url);
}