const { Message } = require('mirai-js');
const {VM, VMScript} = require('vm2')
const { sendGroupMessage, sendGroupNudge, status } = require('../bot');
const axios = require('axios');
const { masterQQ } = require('../config.json');
const { textMsg } = require('../utils');
const cheerio = require('cheerio');

const current = {
    groupId: 0,
    id: 0,
};
const _send = message => {
    sendGroupMessage(current.groupId, message, current.id);
};

const context = {
    guess(type) {
        const types = ['剪刀', '石头', '布'];
        const result = ['哼，侥幸被你赢了！', '你输了，你个辣鸡！', '居然和我想的一样！'];
        if (types.indexOf(type) > -1) {
            let my = Math.floor(Math.random() * 3);
            _send(textMsg(String(types[my])));
            switch (type) {
                case '剪刀':
                    if (my == 0) {
                        _send(textMsg(String(result[2])));
                    } else if (my == 1) {
                        _send(textMsg(String(result[1])));
                    } else if (my == 2) {
                        _send(textMsg(String(result[0])));
                    }
                    break;
                case '石头':
                    if (my == 0) {
                        _send(textMsg(String(result[0])));
                    } else if (my == 1) {
                        _send(textMsg(String(result[2])));
                    } else if (my == 2) {
                        _send(textMsg(String(result[1])));
                    }
                    break;
                case '布':
                    if (my == 0) {
                        _send(textMsg(String(result[1])));
                    } else if (my == 1) {
                        _send(textMsg(String(result[0])));
                    } else if (my == 2) {
                        _send(textMsg(String(result[2])));
                    }
                    break;
            }
        } else {
            _send(textMsg(String('只能出剪刀石头布哦，别想着犯规！')));
        }
    },
    学习资料() {
        let bookList = [
            {
                key: 0,
                name: '《浏览器工作原理与实践》',
                url: 'https://blog.poetries.top/browser-working-principle/',
            },
            {
                key: 1,
                name: '《vscode插件开发》',
                url: 'https://www.bookstack.cn/read/CN-VScode-Docs/README.md',
            },
            {
                key: 2,
                name: '《React技术揭秘》',
                url: 'https://react.iamkasong.com/',
            },
            {
                key: 3,
                name: '《Vue技术揭秘》',
                url: 'https://ustbhuangyi.github.io/vue-analysis/v2/prepare/',
            },
            {
                key: 4,
                name: '《Vue源码解析》',
                url: 'https://vue-js.com/learn-vue/start/#_1-%E5%89%8D%E8%A8%80',
            },
            {
                key: 5,
                name: '《TypeScript入门教程》',
                url: 'https://ts.xcatliu.com/',
            },
            {
                key: 6,
                name: '《深入理解TypeScript》',
                url: 'https://jkchao.github.io/typescript-book-chinese/',
            },
            {
                key: 7,
                name: '《You-need-to-know-css》',
                url: 'https://lhammer.cn/You-need-to-know-css/#/zh-cn/introduce?v=1',
            },
            {
                key: 8,
                name: '《CSS Inspiration》',
                url: 'https://chokcoco.github.io/CSS-Inspiration/#/',
            },
            {
                key: 9,
                name: '《Three.js教程》',
                url: 'http://www.webgl3d.cn/Three.js/',
            },
            {
                key: 10,
                name: '《WebGL教程》',
                url: 'http://www.webgl3d.cn/WebGL/',
            },
            {
                key: 11,
                name: '《深入浅出 webpack》',
                url: 'https://webpack.wuhaolin.cn/',
            },
            {
                key: 12,
                name: '《React源码解析》',
                url: 'https://react.jokcy.me/',
            },
        ];
        let msg = bookList.reduce((pre, cur) => `${pre}${cur.key}:${cur.name}\n${cur.url}\n`, '');
        _send(textMsg(String(msg)));
    },
    提醒(id, msg, time) {
        if(!id || !msg || isNaN(time) || time<0) {
            _send(textMsg(String('参数错误')));
            return;
        }
        const message = new Message();
        message.addAt(id);
        message.addText(String(`${time/1000}秒后提醒你${msg}`));
        _send(message);
        setTimeout(()=>{
            const message1 = new Message();
            message1.addAt(id);
            message1.addText(String(` ${msg}`));
            _send(message1);
        },time)
    },
    async 解释(text) {
        if (!text) return;
        const res = await axios.get(
            `https://dict-mobile.iciba.com/interface/index.php?c=word&m=getsuggest&nums=10&is_need_mean=1&word=${text}`,
        );
        if (res.data.status == 1) {
            let msg = res.data.message[0] ? res.data.message[0].paraphrase : '暂无解释';
            _send(textMsg(String(msg)));
        } else {
            _send(textMsg(String('接口出错')));
        }
    },
    async 名句() {
        const { data } = await axios.get('https://api.oick.cn/yulu/api.php');
        if (data) {
            _send(textMsg(String(data)));
        } else {
            _send(textMsg(String('出错啦')));
        }
    },
    each(num, msg) {
        num = Number(num);
        if (num > 10) {
            num = 10;
        }
        if (num < 0) {
            for (let i = 0; i > num; i--) {
                _send(textMsg(String(msg)));
            }
        }
        if (num > 0) {
            for (let i = 0; i < num; i++) {
                _send(textMsg(String(msg)));
            }
        }
        if (num == 0) {
            _send(textMsg(String(msg)));
        }
    },
    async girl() {
        const { data } = await axios.get('https://www.mxnzp.com/api/image/girl/list/random?app_id=unklujfpjrqt8xkj&app_secret=aHNUUzhJYjQyY2FET2tiY0JXSjVxUT09');
        if (data && data.data && data.data.length > 0) {
            const message = new Message();
            message.addImageUrl(data.data[0].imageUrl);
            _send(message);
        }
    },
    boy() {
        _send(textMsg(String('死基佬！看nm的男人！')));
    },
    async 今日头条() {
        const { data } = await axios.get('http://is.snssdk.com/api/news/feed/v51/');
        let msg = ''
        if (data.message == 'success' && data.data.length > 0) {
            let lens = data.data.length > 5 ? 5 : data.data.length;
            for (let i = 0; i < lens; i++) {
                msg += (i + 1) + ':' + JSON.parse(data.data[i].content).abstract + '\n';
            }
            _send(textMsg(String(msg)));
        } else {
            _send(textMsg(String('出错啦')));
        }
    },
    async 历史上的今天() {
        const { data } = await axios.get('https://api.asilu.com/today');
        let msg = ''
        if (data.code == 200 && data.data.length > 0) {
            let lens = data.data.length > 8 ? 8 : data.data.length;
            for (let i = 0; i < lens; i++) {
                msg += data.data[i].year + ':' + data.data[i].title+'\n';
            }
            _send(textMsg(String(msg)));
        } else {
            _send(textMsg(String('出错啦')));
        }
    },
    async 二次元() {
        const { data } = await axios.get('https://api.btstu.cn/sjbz/api.php?lx=dongman&format=json');
        if (data && data.imgurl) {
            const message = new Message();
            message.addImageUrl(data.imgurl);
            _send(message);
        }
    },
    功能() {
        let msg = `管管目前只能做到下面的事哦~我一定会努力学习更多技能的呢~嘤嘤嘤~~~：\n1.>girl()\n2.>at(qq号,'内容')\n3.>百科('内容')\n4.>output('内容')\n5.>each(3,'内容')\n6.>guess('剪刀')\n7.>解释('hello')\n8.>名句()\n9.>提醒(qq号,'吃饭了',3000)\n10.>今日头条()\n11.>历史上的今天()\n12.>二次元()\n13.>boy()\n14.>学习资料()\n
        `;
        _send(textMsg(msg));
    },
    at(id, msg) {
        const message = new Message();
        message.addAt(id);
        message.addText(' '+String(msg || ''));
        _send(message);
    },
    async 百科(msg) {
        if (!msg) return;
        const { data } = await axios.get(`https://baike.baidu.com/item/${encodeURI(msg)}`);
        const $ = cheerio.load(data);
        let s = $(`.para:lt(3)`).text().substring(0, 200).replace(' ', '');
        _send(textMsg(s ? s : '未找到词条！'));
    },
    output(msg) {
        _send(textMsg(String(msg)));
    },
};
const keys = Object.keys(context).map(item => item + '=');
const vm = new VM({
    timeout: 3000,
    sandbox:context
})
const adminContext = {
    ...context,
    on() {
        _send(textMsg(`${status.on ? 'on' : 'off'}-->on`));
        status.on = true;
    },
    off() {
        _send(textMsg(`${status.on ? 'on' : 'off'}-->off`));
        status.on = false;
    },
    status() {
        _send(textMsg(`${status.on ? 'on' : 'off'}`));
    },
    dpush(qq){
        if(!qq)return
        blist.push(qq)
     },
    释放犯人() {
        let qq = '';
        if (blist[0]) {
            qq = blist[0];
        }
        blist = [];
        _send(textMsg(`${qq ? qq + '等犯人已全部释放' : '监狱空空如也'}`));
    },
};
Object.freeze(context);
Object.freeze(adminContext);
const vmAdmin = new VM({
    timeout: 30000,
    sandbox:adminContext
})
let blist=[]
module.exports = async (data, next) => {
    const { isAtMe, permissionText, id, memberName, groupId, groupName, messageChain, texts } = data
    const text = texts.join("").trim("")
    if(blist.includes(id))return
    const prompt = text[0] + text[1];
    let scriptText = text.substr(2)
    scriptText = scriptText.replace(/（/g, '(');
    scriptText = scriptText.replace(/）/g, ')');
    scriptText = scriptText.replace(/‘|’/g, "'");
    scriptText = scriptText.replace(/“|”/g, '"');
    scriptText = scriptText.replace(/；/g, ';');
    scriptText = scriptText.replace(/，/g, ',');
    if (!["#", ">", "管管"].includes(prompt)) return next()
    current.groupId = groupId
    current.id = id
    if(/require|eval|Function|import|global/.test(text) || keys.find(item => text.replace(/ /g,'').indexOf(item) > -1)){
        _send(textMsg(`丢雷楼某!想搞老子！已经将${id}加入黑名单! `))
        blist.push(id)
        return
     }
     try {
     if (prompt == "#") {
        if (!masterQQ.includes(id))  throw new Error("权限不足,非BOT管理员请用>作为提示符") 
        vmAdmin.run(scriptText)
     }
     if (prompt == ">" || prompt == "管管") {
        vm.run(scriptText)
     }
     } catch (e) {
         _send(textMsg(String(e) + "\n@我获得帮助 输入>功能()获得函数列表"))
     } 
}                                                                  
