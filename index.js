const { bot } = require('./bot')
const { qq, baseUrl, verifyKey } = require('./config.json')
const grouphandle = require('./handles/grouphandle')
const friendhandle = require('./handles/friendhandle')
const main = async () => {
    console.log('正在启动中...',baseUrl,verifyKey,qq)
    await bot.open({
        baseUrl,
        verifyKey,
        qq,
    })
    console.log('启动成功')
    bot.on('FriendMessage', friendhandle)
    bot.on('GroupMessage', grouphandle)
}
main()
