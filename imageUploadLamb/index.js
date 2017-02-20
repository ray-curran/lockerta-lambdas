var Q = require('q');
var knox = require('knox');

exports.handler = (event, context, callback) => {


  var ImageUploader = function(options){

    var deferred = Q.defer();
    var buf = new Buffer(options.data_uri.replace(/^data:image\/\w+;base64,/, ""),'base64');

      knoxClient = knox.createClient({
        key: 'AKIAJOHZIYHI7KRM2LJQ',
        secret: 'YhJdX/wywlx43rYNrPev9fH++u1gd0CncHJOsYuS',
        bucket: 'lockertalk'
      });

      // put to a path in our bucket, and make readable by the public
      req = knoxClient.put('/images/' + options.filename, {
       'Content-Length': buf.length,
       'Content-Type': options.filetype,
       'x-amz-acl': 'public-read' 
     });

      req.on('response', function(res) {
        if (res.statusCode === 200) {
          deferred.resolve(req.url);
        } else
        deferred.reject({error: 'true'});
      });

    req.end(buf);
    return deferred.promise;
  }

var image = ImageUploader({
  data_uri: event.data_uri,
  filename: event.filename,
  filetype: event.filetype
}).then(onGoodImageProcess, onBadImageProcess);

function onGoodImageProcess(resp) {
  callback(null, resp)
}

function onBadImageProcess(resp) {
  callback(null, 'error')
}


}