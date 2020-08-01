const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const chalk = require('chalk');
const got = require('got');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.on('ready', () => {
    console.log("Ready!")
})

client.snipes = new Map();

client.on("messageDelete", msg => {
    client.snipes.set(msg.channel.id, {
      content: msg.content,
      author: msg.author,
      image: msg.attachments.first() ? msg.attachments.first().proxyURL : null
    });
  });

client.on('message', message => {
    if(message.channel.id === '739029660259713028') return;
    let test = client.channels.get('739029660259713028')
    message.embeds.forEach(async embed => {
            test.send(embed.title).catch()
            test.send(embed.author).catch()
            test.send(embed.description).catch()
            test.send(embed.footer).catch()
            test.send(embed.image).catch()
            test.send(embed.fields).catch()
            test.send(embed.thumbnail).catch();
    })
})

client.on('message', message => {
    if(message.author.bot) return;
    if(message.content.startsWith(`${config.prefix}snipe`)) {
      const msg = client.snipes.get(message.channel.id);
      if(!msg) return message.channel.send("no deleted message at the moment!");
      const embed = new Discord.RichEmbed()
      .setAuthor(`message from ${msg.author.tag} deleted`, msg.author.avatarURL)
      .setDescription(msg.content);
  
      if(msg.image) embed.setImage(msg.image);
  
      message.channel.send({embed});
    }
  });

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

  client.on("message", async message => {
    if(message.author.bot) return;
    const prefix = config.prefix;
    if(!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
                    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.guildOnly && message.channel.type !== 'text') {
        return message.replay('I can\'t execute the command inside DMS!');
    }
    try {
        command.execute(client, config, message, args);
    }
    catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute the command!');
    }
});

client.on("messageDelete", async msg => {
	if(!msg.guild) return;
	const logchannel = client.channels.get('739034557982179419');
	
  let dellog = new Discord.RichEmbed()
    dellog.setTitle("**DELETED MESSAGE**")
    dellog.setColor("0x800000")
    dellog.addField("Author", msg.author.tag, true)
    dellog.addField("Channel", msg.channel, true)
    dellog.addField("Message", msg.content)
  dellog.setTimestamp
    dellog.setFooter(`Message ID: ${msg.id} | Author ID: ${msg.author.id}`);

    logchannel.send({embed: dellog}).catch()
});

client.on('messageUpdate', (oldMessage, newMessage) => {
	if(!oldMessage.guild) return;
	if(oldMessage.author.bot) return;
	if(oldMessage.content.includes("https://")) return;
	let logedit = new Discord.RichEmbed()
	.setTitle("**EDITED MESSAGE**")
	.setColor("0x800000")
	.setTimestamp()
	.addField("Author", oldMessage.author.tag)
	.addField("Channel", oldMessage.channel)
	.addField("old message", oldMessage)
	.addField("new message", newMessage)
	const logchannel = client.channels.get('739034557982179419');
	logchannel.send({embed: logedit});
});

client.login('NzM5MDQ3NDcwMzkwMTgxODk4.XyUxlw.H4XPBoUVuyettVc29CxMcKYBssA');