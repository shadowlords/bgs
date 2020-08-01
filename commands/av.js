const Discord = require('discord.js')

module.exports = {
    name: 'av',
    aliases: ['avatar', 'pfp'],
    description: 'display your avatar',
    execute(client, config, message, args) {
if(message.author.bot) return;
let user = message.guild.members.get(args[0]) || message.mentions.members.first() || message.author;
        const ava = new Discord.RichEmbed()
        .setTitle("Here you go fam!")
        .setAuthor(`${user.tag}`)
        .setImage(`${user.avatarURL}`)
        .setColor(0x800000)
        .setTimestamp();
        message.channel.send({embed: ava});
    },
};
