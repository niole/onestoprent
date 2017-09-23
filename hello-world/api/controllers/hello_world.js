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

function findUsersContract(req, res) {
  const {
    userId,
  }  = req.swagger.params;

  res.json(contracts.filter(({ lesseeUserId }) => lesseeUserId === userId.value));
}

function alertsForRenter(req, res) {
  const {
    renterUserId,
  }  = req.swagger.params;

  res.json(userAlerts.filter(({ userId }) => userId === renterUserId.value));
}

function alertsForLandlord(req, res) {
  const {
    landlordUserId,
  }  = req.swagger.params;

  const foundLandlord = landlords.find(ll => ll.userId === landlordUserId.value);
  if (foundLandlord) {
    const managedProperties = properties.filter(p => p.landlordId === foundLandlord.id);
    const alertsForLandlord = userAlerts.filter(alert => !!managedProperties.find(p => p.id === alert.propertyId));
    res.json(alertsForLandlord);
  }
  res.json([]);
}

module.exports = {
  findUsersContract,
  alertsForLandlord,
  alertsForRenter,
};
