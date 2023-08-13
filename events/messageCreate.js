const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = async (client, message) => {
  if (message.author.bot) return;

  if (message.content == ".pk") {
    const pkEmbed = new EmbedBuilder()
      .setColor(0xd70040)
      .setTitle(
        "If you see users talking with the bot tag, they're talking through PluralKit."
      )
      .setDescription(
        "> Due to Discord limitations, these messages will show up with the [BOT] tag - ***however, they are not bots they are users.***\n\nPluralKit is a Discord bot that exists to allow users to proxy their messages via Discord webhooks. This has many practical applications, especially given that Discord doesn't have any features that support the plural community, or any built-in mental health aids.\n\n> This allows for one discord account to have multiple psudo accounts, without the need to have alts in the server.\n\nPluralKit can have multiple uses in other communities, however in ours it should only be used for plurality or self-identity purposes, or as a mental health aid.\n\n***We do not allow users to make use of PluralKit for role-playing.***"
      );

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("plurality")
        .setLabel("What is plurality?")
        .setStyle(ButtonStyle.Secondary)
    );

    message.reply({ embeds: [pkEmbed], components: [row] });
  }

  if (!message.mentions || !message.mentions.users) return;

  const pings = message.mentions.users.map((user) => user.id);

  let warn = false;

  for (const repliedUserId of pings) {
    if (repliedUserId === message.author.id) continue;

    const member = message.guild.members.cache.get(repliedUserId);

    if (member.roles.cache.has(client.config.noPings)) {
      warn = true;
      break;
    }
  }

  if (warn) {
    const replyMessage = await message.reply(
      "### This member has the no pings role, please don't ping them! *(This message will be deleted in 7 seconds)*"
    );

    setTimeout(() => {
      replyMessage.delete();
    }, 7000);
  }
};
