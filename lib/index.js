var fs = require('co-fs');
var path = require('path');

var Debower = require('./debower');
var Logger = require('./logger');

var plugin = function(options) {
    options = options || {};
    
    var debower = new Debower(options);
    var logger = new Logger(options);
    
    return function* (pkg) {    
        if (typeof pkg.path != 'function') {
            logger.warn('duo-debower', 'duo-debower is a *package* plugin, ignoring *file*');
            return;
        }
        
        var componentJsonPath = path.join(pkg.path(), 'component.json');
        var componentJsonExists = yield fs.exists(componentJsonPath);
        
        if (componentJsonExists)
            return;
                
        try {
            var bowerJsonPath = path.join(pkg.path(), 'bower.json')
            var bowerJsonStr = yield fs.readFile(bowerJsonPath, 'utf8');
            var bowerJson = JSON.parse(bowerJsonStr);
            
            var componentJson = yield debower.createComponentJson(bowerJson);
            
            yield fs.writeFile(componentJsonPath, JSON.stringify(componentJson, null, 3));
            logger.log('duo-debower', 'created component.json for bower package ' + bowerJson.name);
        }
        catch(err) {
            logger.error('duo-debower', 'error creating component.json for bower package ' + bowerJson.name);
            logger.error('duo-debower', JSON.stringify(err));
        }
    }
};

module.exports = plugin;