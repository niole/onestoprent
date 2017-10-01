const util = require('util');
const users = require('../../fixtures/users.json');
const userAlerts = require('../../fixtures/userAlerts.json');
const messages = require('../../fixtures/messages.json');
const properties = require('../../fixtures/properties.json');
const landlords = require('../../fixtures/landlords.json');
const contracts = require('../../fixtures/contracts.json');

function findUser(userId) {
  return users.find(u => u.id === userId);
}

function getUser(req, res) {
  const {
    userId,
  }  = req.swagger.params;
  const user = findUser(userId.value) || {};
  res.json(user);
}

function getContract(lesseeUserId) {
   const contract = contracts.find( c =>
      lesseeUserId === c.lesseeUserId && c.active
   );

   if (contract) {
     return contract;
   }

   return {};
}

function getMessages(userId) {
  const foundMessages = messages.filter(message =>
    message.renterUserId === userId || message.landlordUserId === userId);

  return foundMessages.map(message => {
    const renterName = users.find(({ id }) => id === message.renterUserId).name;
    const landlordName = users.find(({ id }) => id === message.landlordUserId).name;
    return Object.assign(
      {},
      message, {
        renterName,
        landlordName,
    });
  });
}

function handleGetLesseeContract(req, res) {
  const {
    lesseeUserId,
  }  = req.swagger.params;

  res.json(getContract(lesseeUserId.value));
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

function extendO(a, b) {
  let next = Object.keys(a).reduce((c, key) => {
    c[key] = a[key];
    return c;
  }, {});

  return Object.keys(b).reduce((c, key) => {
    c[key] = b[key];
    return c;
  }, next);
}

function getAlertsForUser(userId) {
  const alerts = getMessages(userId).concat(
    userAlerts.filter(alert =>
      alert.renterUserId === userId || alert.landlordUserId === userId)
  );

  return alerts.map(alert => {
    const next = {
      renterName: users.find(({ id }) => id === alert.renterUserId).name,
      landlordName: users.find(({ id }) => id === alert.landlordUserId).name,
      address: properties.find(({ id }) => id === alert.propertyId).address,
    };

    return extendO(alert, next);
  });
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

function alertsForUser(req, res) {
  const {
    userId,
  }  = req.swagger.params;

  res.json(getAlertsForUser(userId.value));
}

function alertsForRenter(req, res) {
  const {
    renterUserId,
  }  = req.swagger.params;

  res.json(getAlertsForRender(renterUserId.value));
}

function alertsForLandlord(req, res) {
  const {
    landlordUserId,
  }  = req.swagger.params;

  res.json(getAlertsForLandlord(landlordUserId.value));
}

module.exports = {
  findUsersContract,
  alertsForLandlord,
  alertsForRenter,
  messagesToUser,
  alertsForUser,
  getUser,
  handleGetLesseeContract,
};
