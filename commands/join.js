const Discord = require('discord.js')

module.exports = {
name: 'join',
description: "join vc yes",
async execute(client, config, message, args) {
    if(!message.guild) return message.channel.send("y u use this outside of server")
if(message.member.voiceChannel) {
    message.member.voiceChannel.join()
    .then(connection => {
        message.channel.send("i have joined the voice channel.")
    })
    .catch(console.log);
}else {
    message.reply("join a vc first retard")
}
},
};