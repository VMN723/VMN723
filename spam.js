let isSpamming = false;
const axios = require('axios');

module.exports.config = {
  name: "spamvip",
  version: "4.1.2",
  hasPermssion: 0,
  credits: "Vũ Minh Nghĩa",
  description: "",
  commandCategory: "Group",
  usages: "[số điện thoại] [số lần spam]",
  cooldowns: 0
};

module.exports.run = async function({ api, event, args }) {
  const PREFIX = global.config.PREFIX;
  if (args[0] == "stop") {
    if (isSpamming) {
      isSpamming = false;
      api.sendMessage("Đã dừng spam thành công", event.threadID, event.messageID);
    } else {
      api.sendMessage("Bot đang không trong quá trình spam, không thể dừng", event.threadID, event.messageID);
    }
    return;
  }

  const phoneNumber = args[0];
  const numberOfSpams = parseInt(args[1], 10);

  if (!phoneNumber || !numberOfSpams) {
    api.sendMessage(`Sử dụng: ${PREFIX}spam [số điện thoại] [số lần spam] hoặc ${PREFIX}spam stop để dừng spam`, event.threadID, event.messageID);
    return;
  }

  if (numberOfSpams > 100 || numberOfSpams < 1) {
    api.sendMessage(`Số lần spam không được quá 100 lần và phải lớn hơn 0`, event.threadID, event.messageID);
    return;
  }
  
  if (this.config.credits !== "Vũ Minh Nghĩa") {
    api.sendMessage(`Credits đã bị thay đổi`, event.threadID);
    return;
  }

  isSpamming = true;
  let spamCount = 0;
  let errorCount = 0;
  api.sendMessage(`Bắt đầu spam ${numberOfSpams} lần cho số điện thoại ${phoneNumber}`, event.threadID);
  for (let i = 0; i < numberOfSpams && isSpamming; i++) {
    await delay(2000);
    try {
      const response = await axios.get(`https://vmnghia.codes/spam?sdt=${phoneNumber}`, { responseType: 'arraybuffer' });
      const message = response.data.toString('utf-8');
      spamCount++;
    } catch (err) {
      console.log(err);
      errorCount++;
    }
  }
  isSpamming = false;
  api.sendMessage(`Đã spam thành công cho số ${phoneNumber} với ${spamCount} lần.`, event.threadID);
  if (errorCount > 0) {
    api.sendMessage(`Đã có ${errorCount} lỗi xảy ra trong quá trình spam.`, event.threadID);
  }
}

function delay(delayInms) {
  return new Promise(resolve => setTimeout(resolve, delayInms));
}
