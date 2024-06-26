const fs = require('fs/promises');
const { FILE_PATHS } = require('../constants');
const { format } = require('date-fns');

exports.toOrderKey = (owner) =>
  `o:${owner}:${Math.round(Math.random() * Math.pow(10, 5))
    .toString()
    .padStart(5, 0)}`;

exports.findOrderKey = (owner) => `o:${owner}`;

exports.getViewName = (user) =>
  user.username
    ? `@${user.username}`
    : `${user.first_name || ''} ${user.last_name || ''}`.trim();

exports.getName = (user) =>
  user.username || `${user.first_name || ''} ${user.last_name || ''}`.trim();

exports.getData = async (path) => {
  const data = await fs.readFile(path);
  return JSON.parse(data);
};

exports.getKeyboardPayeeMembers = async () => {
  const members = await this.getData(FILE_PATHS.MEMBER);
  const config = await this.getData(FILE_PATHS.CONFIG);

  if (members.length) {
    return [
      ...members.map((member) => {
        return [
          {
            text: `${member.name} ${config.payee.id === member.id ? '✅' : ''}`,
            callback_data: `setpayee ${member.id}`,
          },
        ];
      }),
    ];
  }

  return undefined;
};

exports.getKeyboardOrders = async (initOrders, displayField = 'name') => {
  const orders = initOrders || (await this.getData(FILE_PATHS.ORDER));
  const orderOwners = Object.keys(orders);

  if (orderOwners.length) {
    return [
      ...orderOwners.map((key) => {
        const order = orders[key];

        let textId = order[displayField];
        if (!isNaN(new Date(textId).getTime())) {
          textId = format(new Date(textId), 'dd/MM/yyyy');
        }

        return [
          {
            text: textId,
            callback_data: '#',
          },
          {
            text: `Đã gửi ${order.paid ? '✅' : '❌'}`,
            callback_data: `paid ${key}`,
          },
          {
            text: `Đã nhận ${order.received ? '✅' : '❌'}`,
            callback_data: `received ${key}`,
          },
        ];
      }),
    ];
  }

  return undefined;
};

exports.updateData = async (path, data) => {
  try {
    await fs.writeFile(path, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    return false;
  }
};
