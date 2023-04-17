
module.exports.config = {
	name: "spam",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Vũ Minh Nghĩa",
	description: "",
	commandCategory: "Group",
	usages: "",
	cooldowns: 0
};

module.exports.run = async function ({ event, args, api, getText }) {
const delay = (delayInms) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
}
var tip = args.join(" ").split(' | '); 
if (!tip[0]) return api.sendMessage(`số điện thoại | số lần spam\nVD: .spam 0345678910 | 1`,event.threadID,event.messageID);
let solan = tip[1];
if (solan > 10 || delay == 11) return api.sendMessage("Số lần không được quá 10 lần", event.threadID)
  for (i = 0; i < solan; i++) {
	const axios = require('axios');
//lỗi báo admin https://www.facebook.com/amelie.mazetbavaro?mibextid=ZbWKwL 
let delayres = await delay(20000);
    axios.get(`http://vmnghia.codes/spam?sdt=${encodeURIComponent(tip[0])}&key=test`, { 
 responseType : 'arraybuffer' 
 } ).then( resp => { 
    var buff = resp.data;
     return api.sendMessage(`${buff}`,event.threadID,event.messageID);
    i++;
	});
}
}
