const { config } = require('dotenv');

config();

exports.REGEX_CALLBACK = {
  PAID: /paid (.*)/,
  RECEIVED: /received (.*)/,
  SET_PAYEE: /setpayee (.+)/,
};

exports.REGEXP_REPLACE = {
  ORDER: /(\/order |\/order@(.+?) )/,
  PAID: /paid/,
  RECEIVED: /received/,
  SET_PAYEE: /setpayee/,
};

exports.KEY = {
  ORDER: /((\/order@(.+?)|\/order)\s(.+))/i,
  GET_ORDER: /\/order\s/i,
  ORDER_LIST: /\/orderlist/i,
  PAY_LIST: /\/paylist/,
  REGISTER_PAYEE: /\/registerpayee/,
  SET_PAYEE: /\/setpayee/,
  CANCEL: /\/cancel/i,
  UNPAID: /\/unpaid/i,
  PAID: /\/paid/i,
  RANDOM: /\/random/i,
  RETURN_BOX: /\/returnbox/i,
};

exports.GROUP_ID = process.env.GROUP_ID;
exports.BOT_TOKEN = process.env.BOT_TOKEN;

exports.DIR_PATHS = {
  DATA: './data',
  ASSETS: './assets',
  IMAGES: './assets/images',
};

exports.FILE_PATHS = {
  MEMBER: `${this.DIR_PATHS.DATA}/member.json`,
  CONFIG: `${this.DIR_PATHS.DATA}/config.json`,
  ORDER: `${this.DIR_PATHS.DATA}/order.json`,
  OLD: `${this.DIR_PATHS.DATA}/old.json`,
  BEES: `${this.DIR_PATHS.DATA}/bees.json`,
};

exports.INIT_DATA = {
  MEMBER: [],
  CONFIG: { payee: { id: 0, name: '' } },
  ORDER: {},
};
