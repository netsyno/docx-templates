'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _timm = require('timm');

var _mainBrowser = require('./mainBrowser');

var _mainBrowser2 = _interopRequireDefault(_mainBrowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-param-reassign, no-console */

var DEBUG = process.env.DEBUG_DOCX_TEMPLATES;
var log = DEBUG ? require('./debug').mainStory : null;

// ==========================================
// Main
// ==========================================
var getDefaultOutput = function getDefaultOutput(templatePath) {
  var _path$parse = _path2.default.parse(templatePath),
      dir = _path$parse.dir,
      name = _path$parse.name,
      ext = _path$parse.ext;

  return _path2.default.join(dir, name + '_report' + ext);
};

var createReport = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(options) {
    var template, replaceImages, _probe, output, buffer, newOptions, imgDataBase64, imgNames, i, imgName, imgPath, imgBuf, report;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            template = options.template, replaceImages = options.replaceImages, _probe = options._probe;
            output = options.output || getDefaultOutput(template);

            DEBUG && log.debug('Output file: ' + output);

            // ---------------------------------------------------------
            // Load template from filesystem
            // ---------------------------------------------------------
            DEBUG && log.debug('Reading template from disk at ' + template + '...');
            _context.next = 6;
            return _fsExtra2.default.readFile(template);

          case 6:
            buffer = _context.sent;
            newOptions = (0, _timm.set)(options, 'template', buffer);

            // ---------------------------------------------------------
            // Images provided as path are converted to base64
            // ---------------------------------------------------------

            if (!(replaceImages && !options.replaceImagesBase64)) {
              _context.next = 26;
              break;
            }

            DEBUG && log.debug('Converting images to base64...');
            imgDataBase64 = {};
            imgNames = (0, _keys2.default)(replaceImages);
            i = 0;

          case 13:
            if (!(i < imgNames.length)) {
              _context.next = 24;
              break;
            }

            imgName = imgNames[i];
            imgPath = replaceImages[imgName];

            DEBUG && log.debug('Reading ' + imgPath + ' from disk...');
            _context.next = 19;
            return _fsExtra2.default.readFile(imgPath);

          case 19:
            imgBuf = _context.sent;

            imgDataBase64[imgName] = imgBuf.toString('base64');

          case 21:
            i++;
            _context.next = 13;
            break;

          case 24:
            newOptions.replaceImagesBase64 = true;
            newOptions.replaceImages = imgDataBase64;

          case 26:
            _context.next = 28;
            return (0, _mainBrowser2.default)(newOptions);

          case 28:
            report = _context.sent;

            if (!(_probe != null)) {
              _context.next = 31;
              break;
            }

            return _context.abrupt('return', report);

          case 31:

            // ---------------------------------------------------------
            // Write the result on filesystem
            // ---------------------------------------------------------
            DEBUG && log.debug('Writing report to disk...');
            _context.next = 34;
            return _fsExtra2.default.ensureDir(_path2.default.dirname(output));

          case 34:
            _context.next = 36;
            return _fsExtra2.default.writeFile(output, report);

          case 36:
            return _context.abrupt('return', null);

          case 37:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function createReport(_x) {
    return _ref.apply(this, arguments);
  };
}();

// ==========================================
// Public API
// ==========================================
exports.default = createReport;