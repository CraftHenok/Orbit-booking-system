const AccessControl = require('accesscontrol');
const ac = new AccessControl();

const roles = (function () {
  ac.grant("R")
    .createAny("appointment")
    .readAny("appointment")
    .readAny("doctor")
    .updateAny("appointment")
    .deleteAny("appointment")
    .grant("D")
    .readOwn("doctor")
    .updateOwn("doctor")
    .deleteOwn("doctor")


  return ac;
})();

exports.getGrants = (function () {
  return roles;
})();

