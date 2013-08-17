'use strict';

module.exports = function () {

  this.$({
    name: 'hello', // default: 'hello'
    path: '/hello'
  });

  this.hello = {
    path: '/:name', // default: '/'
    handler: function (req, res, next) {
      res.send('hello ' + req.params.name);
    }
  };

};
