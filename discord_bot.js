const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on("guildCreate", guild => {
    console.log(`the bot joins a guild`);
});

bot.on("ready", () => {
    bot.user.setActivity("I AM HOOMAN", { type: "STREAMING", url: "https://www.twitch.tv/" });
    console.log("Bot on")
});

bot.on("message", message => {
    // Check if message is a DM
    if (!message.guild) return;
    // Check if a bot sent the message
    if (message.author.bot) return;
    // Check if message author is a bot
    if (message.author.bot) {
        if (message.content.startsWith("```\nReason for Poll")) {
            message.react("✅");
            message.react("❌");
            message.react("❓");
        }
        return;
    }

    // Check if attachments are on message  
    /*
    if(message.attachments.size > 0) {
        // Get each attachment name
        message.attachments.forEach(attachment => {
            let n = attachment.name;
            console.log(n);
        });
    }
    */

    // Give instructions on how to use various commands
    if (message.content == "!help")
        message.channel.send("Intructions to .....");
    // Start poll
    if (message.content.substring(0,5) == "!poll") {
        let pollTitle = message.content.substring(5,message.content.length).trim();
        if (pollTitle.length < 1) {
            message.channel.send("Enter poll title containing at least one character");
            return;
        }
        message.channel.send("```\nReason for Poll:\n" + pollTitle + "\n\nTo vote yes use the ✅ emoji\n" +
            "To vote no use the ❌ emoji\nTo abstain use the ❓ emoji\n\nTotal ✅: 0\nTotal ❌: 0\nTotal ❓: 0\n```");
        //message.channel.send("Poll for ");
    }
    // If emoji is posted, react with emoji
    if (message.content.includes("<:emoji_name:emoji_id>"))
        message.react("emoji_id");
    // If user mentioned react with emoji
    if (message.mentions.users.keyArray().includes("user_id"))
        message.react("emoji_id");
    // Make bot reply based on mentions
    if (message.mentions.members.first()) {
        let list_of_users = message.mentions.users.keyArray();
        let msg = String(message.content).replace(" ", "").split("<@!").join("").split(">").filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        });
        msg.pop();
        if (JSON.stringify(msg) == JSON.stringify(list_of_users))
           message.channel.send("If you mention someone, make sure to give a reason why...");
    }
});

// Welcome message
bot.on('guildMemberAdd', member => {
    if (member.bot) return;
    const LOGO_LOCATION = "https://qph.fs.quoracdn.net/main-qimg-4d88d117cfd7a942dd5f0568f1f13e4c.webp"
    member.guild.systemChannel.send("Welcome " + member, {files: [LOGO_LOCATION]});
});


bot.login('bot_code');
