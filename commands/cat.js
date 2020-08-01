const Discord = require('discord.js')
const got = require('got');

module.exports = {
name: 'cat',
aliases: ["pussy", "meow"],
description: "random pussy pic",
async execute(client, config, message, args) {
    const puss = new Discord.RichEmbed();
    got('https://www.reddit.com/r/cat/random/.json').then(response => {
    let content = JSON.parse(response.body);
        let permalink = content[0].data.children[0].data.permalink;
        let memeUrl = `https://reddit.com${permalink}`;
        let memeImage = content[0].data.children[0].data.url;
        let memeTitle = content[0].data.children[0].data.title;
        let memeUpvotes = content[0].data.children[0].data.ups;
        let memeDownvotes = content[0].data.children[0].data.downs;
        let memeNumComments = content[0].data.children[0].data.num_comments;
        puss.addField(`${memeTitle}`, `[View thread](${memeUrl})`);
        puss.setImage(memeImage);
        puss.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`);
        message.channel.send({embed: puss})
            .then(sent => console.log(`Sent a reply to ${sent.author.username}`))
        console.log('Bot responded with: ' + memeImage);
    }).catch(console.error);
},
};