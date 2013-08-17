'use strict';

var path = require('path');
var Routes = require('youmeb-routes');

module.exports = function (app) {

  var routes = Routes.create(app);
  var groups = {
    guest: [],
    admin: ['guest']
  };

  routes
    .source(path.join(__dirname, 'controllers'))
    .useFirewall(function (req, res, next) {
      var group = req.query.group || '';
      var security = req.$route.security;

      if (!groups.hasOwnProperty(group)) {
        group = 'guest';
      }

      next(null, (function check(group) {
        var len;

        if (!!~security.indexOf(group)) {
          return true;
        }

        if (groups.hasOwnProperty(group)) {
          len = groups[group].length;
          while (len) {
            len -= 1;
            if (check(groups[group][len])) {
              return true;
            }
          }
        }

        return false;
      })(group));
    });

  return routes;
};
