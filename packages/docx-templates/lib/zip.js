'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipSave = exports.zipSetBase64 = exports.zipSetBinary = exports.zipSetText = exports.zipGetText = exports.zipExists = exports.zipLoad = undefined;

var _jszip = require('jszip');

var _jszip2 = _interopRequireDefault(_jszip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var zipLoad = function zipLoad(inputFile) {
  return _jszip2.default.loadAsync(inputFile);
};

/* eslint-disable new-cap */

var zipExists = function zipExists(zip, filename) {
  return zip.file(filename) != null;
};
var zipGetText = function zipGetText(zip, filename) {
  return zip.file(filename).async('text');
};
var zipSetText = function zipSetText(zip, filename, data) {
  return zip.file(filename, data);
};
var zipSetBinary = function zipSetBinary(zip, filename, data) {
  return zip.file(filename, data, { binary: true });
};
var zipSetBase64 = function zipSetBase64(zip, filename, data) {
  return zip.file(filename, data, { base64: true });
};
var zipSave = function zipSave(zip) {
  return zip.generateAsync({
    type: 'uint8array',
    compression: 'DEFLATE',
    compressionOptions: { level: 1 }
  });
};

// ==========================================
// Public API
// ==========================================
exports.zipLoad = zipLoad;
exports.zipExists = zipExists;
exports.zipGetText = zipGetText;
exports.zipSetText = zipSetText;
exports.zipSetBinary = zipSetBinary;
exports.zipSetBase64 = zipSetBase64;
exports.zipSave = zipSave;