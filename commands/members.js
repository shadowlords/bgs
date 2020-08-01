const Discord = require('discord.js')

module.exports = {
name: 'members',
aliases: ["users", "howmanyretards"],
description: "shows the user amount.",
async execute(client, config, message, args) {
    message.channel.send(`this server has ${message.guild.memberCount} members`)
},
};