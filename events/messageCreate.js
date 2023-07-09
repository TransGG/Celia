module.exports = async (client, message) => {
  if (message.author.bot || !message.mentions || !message.mentions.users) {
    return;
  }

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
