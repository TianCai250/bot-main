const { Middleware,Message } = require('mirai-js')
const {sleep,textMsg}=require('../utils')
const {sendMessage}=require('../bot')
module.exports=new Middleware().done((data)=>{
    const {messageChain,sender}=data
    sendMessage(sender.id,textMsg("别找我聊天，我害怕陌生人"),true)
})
