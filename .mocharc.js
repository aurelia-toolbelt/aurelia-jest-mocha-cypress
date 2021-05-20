'use strict'

module.exports = {  
  exit: true,
  timeout: '3000',
  recursive: true,
  file: ['./test/mocha-pretest.js'],
  spec: "test/unit-mocha/**/*.ts"
}
