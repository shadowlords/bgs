const Discord = require("discord.js");

module.exports = {
    name: 'whois',
    description: 'user information, duh',
    execute(client, config, message, args) {
        let user = message.mentions.users.first() || message.guild.members.get(args[0]) || message.author;
        const member = message.guild.member(user);
        let userinf = new Discord.RichEmbed()
        .setColor(0x800000)
        .setThumbnail(`${member.user.avatarURL}`)
        .addField(`${user.tag}`, `${user}`, true)
        .addField("userid: ", `${user.id}`, true)
        .addField("Nick:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
        .addField("Status:", `${user.presence.status}`, true)
        .addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
        .addField("Bot:", `${user.bot}`, true)
        .addField("joined at:", `${member.joinedAt}`,true)
        .addField("created", `${member.createdAt}`, true)
        .addField("Roles:", member.roles.filter(role => role.name !== "@everyone").map(roles => `${roles}`).join(', '), true)
        .setTimestamp()
        message.channel.send({embed: userinf});
    }
}