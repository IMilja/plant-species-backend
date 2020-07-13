/* eslint-disable no-console */
const yargs = require('yargs');
const User = require('../models/User');

const { argv } = yargs
  .command('create-super-admin', 'Create a super user for this first time', {
    'create-super-user': {
      description: 'Create super admin user',
      alias: 'e',
      type: 'text',
    },
  })
  .option('email', {
    alias: 'e',
    description: 'Enter the the users email addresses',
    type: 'text',
  })
  .option('password', {
    alias: 'p',
    description: 'Enter the the users password',
    type: 'text',
  })
  .help()
  .alias('help', 'h');

if (argv._.includes('create-super-user')) {
  if (!argv.email || !argv.password) {
    console.log('Email (--email) and passwords (--password) are required');
  } else {
    const { email, password } = argv;
    // roleId = 'SUPER_ADMIN'
    User.query().insert({
      email,
      password,
      active: 1,
      roleId: 2,
    })
      .then(() => {
        console.log('Super admin successfully created');
      })
      .catch(() => {
        console.error('Error while creating super admin');
      });
  }
}
