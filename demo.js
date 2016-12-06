var asana = require('asana');
var Particle = require('particle-api-js');
var my_access_token = '0/c9958fbdf283700f8c67eef330d24324';
var client = asana.Client.create().useAccessToken(my_access_token);
client.users.me()
  .then(function(user) {
    var userId = user.id;
     var workspaceId = user.workspaces[1].id;
    return client.tasks.findAll({
        assignee: userId,
        workspace: workspaceId,
        completed_since: 'now',
        opt_fields: 'id,name,completed'
    });
  })
  .then(function(response) {
    // There may be more pages of data, we could stream or return a promise
    // to request those here - for now, let's just return the first page
    // of items.
    console.log(response.data);
    var len = response.data.length.toString();
    
    var particle = new Particle();
    var fnPr = particle.callFunction({ deviceId: '250027001347343432313031', name: 'pubtest', argument: len, auth: '04a44acad6adda6d4c57d7e7d458594fe6f2ef62' });
    fnPr.then(
        function(data) {
        console.log('Function called succesfully:', data);
  }, function(err) {
    console.log('An error occurred:', err);
  });
  });


