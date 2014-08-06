var GitHubApi = require("github")
, config = require('../configuration')
, async =  require("async")
, moment = require('moment')
, _ =  require("underscore")

function GitHubRepo(token, user) {
  this.token = token;
  this.user = user;

  this.github = new GitHubApi({
    version: "3.0.0",
    timeout: 5000 });

  this.github.authenticate({
    type: "oauth",
    token: token
  });
};

module.exports = GitHubRepo;

GitHubRepo.prototype.repositories = function(callback) {
  this.github.repos.getAll({}, function(error, response) {
    if (error) return callback(error, null);
    if (response == null) return callback(null, null);

    var items = response.map(function(model) {
      return _.pick(model, ['id','name', 'description']);
    });

    callback(null, items);
  });
};