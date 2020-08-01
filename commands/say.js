const Discord = require('discord.js')

module.exports = {
name: 'say',
aliases: ["talk"],
description: "say stuff using the bot kyes",
async execute(client, config, message, args) {
const sayMessage = args.join(" ");
message.delete().catch(O_o=>{});
message.channel.send(sayMessage);
},
};