const moment = require('moment');

module.exports = {
  formatDate(date) {
    return moment(date).format('YYYY-MMM-DD hh:mm:ss');
  },
};
