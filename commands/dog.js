const Discord = require('discord.js')
const got = require('got');

module.exports = {
name: 'dog',
aliases: ["doggo", "wooflord"],
description: "random doggo yes",
async execute(client, config, message, args) {
    const dogg = new Discord.RichEmbed();
    got('https://www.reddit.com/r/Dogs/random/.json?limit=100').then(response => {
        let content = JSON.parse(response.body);
        let permalink = content[0].data.children[0].data.permalink;
        let memeUrl = `https://reddit.com${permalink}`;
        let memeImage = content[0].data.children[0].data.url;
        let memeTitle = content[0].data.children[0].data.title;
        let memeUpvotes = content[0].data.children[0].data.ups;
        let memeDownvotes = content[0].data.children[0].data.downs;
        let memeNumComments = content[0].data.children[0].data.num_comments;
        dogg.addField(`${memeTitle}`, `[View thread](${memeUrl})`);
        dogg.setImage(memeImage);
        dogg.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`);
        message.channel.send({embed: dogg})
            .then(sent => console.log(`Sent a reply to ${sent.author.username}`))
        console.log('Bot responded with: ' + memeImage);
    }).catch(console.error);
},
};