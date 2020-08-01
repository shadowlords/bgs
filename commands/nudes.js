const Discord = require('discord.js')
const got = require('got');

module.exports = {
name: 'nudes',
aliases: ["rnude"],
description: "some nude fun",
async execute(client, config, message, args) {
if(!message.channel.nsfw) return message.channel.send("hey horny fuck, go to an nsfw channel right this instant");
    const ass = new Discord.RichEmbed();
    got('https://www.reddit.com/r/Nudes/random/.json').then(response => {
        let content = JSON.parse(response.body);
        let permalink = content[0].data.children[0].data.permalink;
        let memeUrl = `https://reddit.com${permalink}`;
        let memeImage = content[0].data.children[0].data.url;
        let memeTitle = content[0].data.children[0].data.title;
        let memeUpvotes = content[0].data.children[0].data.ups;
        let memeDownvotes = content[0].data.children[0].data.downs;
        let memeNumComments = content[0].data.children[0].data.num_comments;
        ass.addField(`${memeTitle}`, `[View thread](${memeUrl})`);
        ass.setImage(memeImage);
        ass.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`);
        message.channel.send({embed: ass})
            .then(sent => console.log(`Sent a reply to ${sent.author.username}`))
        console.log('Bot responded with: ' + memeImage);
    }).catch(console.error);
},
};
