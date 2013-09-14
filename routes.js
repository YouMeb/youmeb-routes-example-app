'use strict';

var path = require('path');
var Routes = require('youmeb-routes');

module.exports = function (app) {

  var routes = Routes.create(app);

  routes
    .source(path.join(__dirname, 'controllers'))
    .useFirewall({
      user: 'guest',
      admin: ['user']
    }, function (req, res, next) {
      var group = req.query.group || '';
      var security = req.$route.security;

      next(null, (function () {

        if (!!~security.indexOf(group)) {
          return true;
        }

        var len = security.length;

        while (len--) {
          if (!!~req.groups[security[len]].indexOf(group)) {
            return true;
          }
        }

        return false;

      })());
    });

  return routes;
};
