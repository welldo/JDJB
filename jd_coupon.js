//48 9,22 * * * jd_sign.js
/*
[task_local]
京东签到
48 9,22 * * * jd_sign.js, tag=京东签到, enabled=true
================Loon==============
[Script]
cron "48 9,22 * * *" script-path=jd_sign.js,tag=京东签到
*/
const {Env} = require('./utils/magic');
const $ = new Env('M京东签到')
$.logic = async function () {
    await signBeanIndex()
    await $.wait(3000, 5000)
    //await cgame();
}
$.run({filename: __filename, wait: [1000, 2000], random: true})
.catch(reason => console.log(reason))

async function signBeanIndex() {
    let url = `https://api.m.jd.com/client.action`
    let headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Host': `api.m.jd.com`,
        'Origin': 'https://api.m.jd.com',
        'Referer': `https://api.m.jd.com`,
        'Cookie': $.cookie
    }
    let body = "functionId=newBabelAwardCollection&client=wh5&body=%7B%22activityId%22%3A%223H885vA4sQj6ctYzzPVix4iiYN2P%22%2C%22scene%22%3A%221%22%2C%22args%22%3A%22key%3DFA278B2A37B4923F2E90E51B0BC5106AB64C5AD440B2F2FA0BA947098087B41471D301BA4C7443AFCC1BF9CAA4ED73CD_bingo%2CroleId%3D9B2FE4F49479DEF873FB476872C26800_bingo%2CstrengthenKey%3D19F512DCD8EE34ABE9C4FB4A92C2F42AA547CF6E76AEFA029A1328A134869781_bingo%22%7D"
    let data = await $.post(url, body, headers)
    let datajson000 = JSON.stringify(data)
    //let datastr = JSON.parse.toString(data)
    //let title = datajson.subCodeMsg
    $.log(`优惠券领取结果：  ${datajson000} `)
}

async function cgame() {
    let url = `https://cgame-stadium.jd.com/api/v1/sign`
    let headers = {
        'Connection': 'keep-alive',
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/json',
        'Origin': 'https://pro.m.jd.com',
        'ActivityId': '7c51826be9f241c1ad9733df34d242c5',
        'Host': 'cgame-stadium.jd.com',
        'Referer': 'https://pro.m.jd.com/mall/active/dj6us2JJRLMMBb4iDaSK4wxvBMt/index.html',
        'Accept-Language': 'zh-cn',
        'Accept': 'application/json',
        'Cookie': $.cookie
    }
    let data = await $.post(url, {}, headers)
    let bean = data?.data?.beanNum || 0;
    if (bean > 0) {
        $.log(`汽车签到 获得${bean}京豆`)
    }
}

