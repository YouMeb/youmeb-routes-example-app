'use strict';

module.exports = function () {

  this.$({
    path: '/hello'
  });

  this.index = {
    path: '/:name', // default: '/'
    handler: function (req, res, next) {
      res.send('hello ' + req.params.name);
    }
  };

};
