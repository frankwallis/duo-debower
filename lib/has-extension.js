/**
 * Check if file has any of the supplied extensions
 *
 * @param {String} filename 
 * @param {String|Array<String>} extensions
 * @return {Boolean} true if the file has one of the supplied extensions
 * @api private
 */
module.exports = function (filename, extensions) {
  if (!Array.isArray(extensions))
    extensions = [ extensions ];
  
  var fileext = filename.substr(filename.lastIndexOf('.') +1, filename.length);
    
  return extensions.some(function(ext) {
    return (fileext === ext);
  });
};