const Discord = require('discord.js')

module.exports = {
name: 'sinfo',
aliases: ["serverinfo", "server"],
description: "gives info about the server",
async execute(client, config, message, args) {
    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };
    let sinfo = new Discord.RichEmbed()
    .setTitle("server info")
    .setDescription(`info about the ${message.guild.name} server`)
    .setColor(0x800000)
    .setTimestamp()
    .addField("server creation date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`)
    .addField("server id", `${message.guild.id}`)
    .addField("server owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`)
    .addField("Total | Humans | Bots", `${message.guild.members.size} | ${message.guild.members.filter(member => !member.user.bot).size} | ${message.guild.members.filter(member => member.user.bot).size}`)
    .addField('Location', message.guild.region)
    .addField("Roles", message.guild.roles.size)
    .addField("Channels", message.guild.channels.size)
    message.channel.send({embed: sinfo});
},
};