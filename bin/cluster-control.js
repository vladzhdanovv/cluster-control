#!/usr/bin/env node
const args = process.argv.slice(2);

if (['-s', '--setup'].includes(args[0])){
  require('../scripts/setup');
} else {
  process.env.NODE_ENV = 'production';
  require('../src/server/index');
}
