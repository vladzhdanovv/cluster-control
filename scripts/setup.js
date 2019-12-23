#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const colors = require('colors');
const prompts = require('prompts');
const { passwordFile } = require('../config');
const hash = require('../src/server/helpers/hash');

const random = length => Math.random().toString(length * 3).slice(-length);

try {
  fs.mkdirSync(path.dirname(passwordFile));
} catch (e) {}

const onSubmit = ({ name }, answer) => {
  const isRandom = name === 'choice' && answer === 'random';
  if (isRandom || name === 'password') {
    const password = isRandom ? random(8) : answer;
    fs.writeFileSync(passwordFile, hash(password));
    isRandom && console.log("Your password is: ".bold, password.bold.cyan);
    console.log("Setup completed successfully!".bold.green);
    process.exit(0);
  }
};

const questions = [
  {
    type: 'select',
    name: 'choice',
    message: 'You want to use random one or input by yourself?',
    choices: [
      { title: 'Input', value: 'input' },
      { title: 'Random', value: 'random' }
    ],
  },
  {
    type: prev => prev === 'input' ? 'invisible' : null,
    name: 'password',
    message: 'Please set "admin" password',
    validate: text => !!text || 'Password is required!'
  }
];

if (fs.existsSync(passwordFile)) process.exit(0);

console.log("Setup password to cluster control".bold.yellow);
(async () => await prompts(questions, { onSubmit }))();
