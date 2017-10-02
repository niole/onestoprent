import axios from 'axios';

const apiHost = "http://127.0.0.1:10010";

export function getLesseeContract(lesseeUserId) {
  const url = `${apiHost}/contract/find/lessee?lesseeUserId=${lesseeUserId}`;
  return axios(url);
}

export function getUserData(userId) {
  const url = `${apiHost}/user?userId=${userId}`;
  return axios(url);
}

export function getAlertsForUser(userId) {
  const url = `${apiHost}/alerts/all?userId=${userId}`;
  return axios(url);
}

export function getAlertsForLandlord(userId) {
  const url = `${apiHost}/alerts/landlord?landlordUserId=${userId}`;
  return axios(url);
}

export function getAlertsForRenter(userId) {
  const url = `${apiHost}/alerts/landlord?renterUserId=${userId}`;
  return axios(url);
}

export function getMessages(userId) {
  const url = `${apiHost}/messages?userId=${userId}`;
  return axios(url);
}

export function getAllContracts(userId, isRenter) {
  const url = `${apiHost}/contract/find/all?userId=${userId}&isRenter=${isRenter}`;
  return axios(url);
}

