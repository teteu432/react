const fs = require('fs');
const path = require('path');

const filePath = path.join(
  __dirname,
  'node_modules',
  'buffer-equal-constant-time',
  'index.js'
);

if (!fs.existsSync(filePath)) {
  console.log('[patch] buffer-equal-constant-time não encontrado, pulando.');
  process.exit(0);
}

const original = fs.readFileSync(filePath, 'utf8');

if (original.includes('SlowBuffer || Buffer')) {
  console.log('[patch] Já aplicado, nada a fazer.');
  process.exit(0);
}

const patched = `/*jshint node:true */
'use strict';
var Buffer = require('buffer').Buffer;

var SlowBuffer = require('buffer').SlowBuffer || Buffer;

module.exports = bufferEq;

function bufferEq(a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }
  var c = 0;
  for (var i = 0; i < a.length; i++) {
    c |= a[i] ^ b[i];
  }
  return c === 0;
}

bufferEq.install = function() {
  Buffer.prototype.equal = function equal(that) {
    return bufferEq(this, that);
  };
  if (SlowBuffer && SlowBuffer.prototype) {
    SlowBuffer.prototype.equal = Buffer.prototype.equal;
  }
};

var origBufEqual = Buffer.prototype.equal;
bufferEq.restore = function() {
  Buffer.prototype.equal = origBufEqual;
};
`;

fs.writeFileSync(filePath, patched, 'utf8');
console.log('[patch] buffer-equal-constant-time corrigido para Node.js v22+.');