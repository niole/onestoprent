const util = require('util');
const userAlerts = require('../../fixtures/userAlerts.json');
const messages = require('../../fixtures/messages.json');
const properties = require('../../fixtures/properties.json');
const landlords = require('../../fixtures/landlords.json');
const contracts = require('../../fixtures/contracts.json');

/**
 * TODO
 * get alerts for landlord
 * get alerts for user
 * get user's contract
 */

function getMessages(toUserId) {
  return messages.filter(message => message.toUserId === toUserId);
}

function messagesToUser(req, res) {
  const {
    userId,
  }  = req.swagger.params;

  res.json(getMessages(userId.value));
}

function getUsersContract(userId) {
  return contracts.filter(({ lesseeUserId }) => lesseeUserId === userId);
}

function getAlertsForRender(renderUserId) {
  return userAlerts.filter(({ userId }) => userId === renterUserId).concat(
    getMessages(renderUserId)
  );
}

function getAlertsForLandlord(landlordUserId) {
  const foundLandlord = landlords.find(ll => ll.userId === landlordUserId);
  if (foundLandlord) {
    const managedProperties = properties.filter(p => p.landlordId === foundLandlord.id);
    const alertsForLandlord = userAlerts.filter(alert => !!managedProperties.find(p => p.id === alert.propertyId));
    return alertsForLandlord.concat(getMessages(landlordUserId));
  }
  return [];
}

function findUsersContract(req, res) {
  const {
    userId,
  }  = req.swagger.params;

  res.json(getUsersContract(userId.value));
}

function alertsForRenter(req, res) {
  const {
    renterUserId,
  }  = req.swagger.params;

  res.json(getAlertsForRender(renterUserId.value));
}

function countAlertsForRenter(req, res) {
  const {
    renterUserId,
  }  = req.swagger.params;

  res.json(getAlertsForRender(renterUserId.value).length);
}

function alertsForLandlord(req, res) {
  const {
    landlordUserId,
  }  = req.swagger.params;

  res.json(getAlertsForLandlord(landlordUserId.value));
}

function countAlertsForLandlord(req, res) {
  const {
    landlordUserId,
  }  = req.swagger.params;

  res.json(getAlertsForLandlord(landlordUserId.value).length);
}

module.exports = {
  findUsersContract,
  alertsForLandlord,
  alertsForRenter,
  countAlertsForRenter,
  countAlertsForLandlord,
  messagesToUser,
};
