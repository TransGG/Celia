const snoowrap = require("snoowrap");
let started = false;

module.exports = async (client) => {
  client.redditCheck = async () => {
    if (started) return;
    else started = true;

    const channel = await client.channels.fetch(client.config.reddit.channel);

    if (!channel) return;

    const redditClient = await new snoowrap(client.config.reddit.client);

    if (!redditClient) return;

    const subreddit = await redditClient.getSubreddit(
      client.config.reddit.subreddit
    );

    if (!subreddit) return;

    setInterval(async () => {
      const approvedPosts = await subreddit.getModerationLog({
        type: "approvelink",
      });

      if (!approvedPosts) return;

      const messages = await channel.messages.fetch({ limit: 25 });
      const messagesContent = messages.map((m) => m.content);

      let toPost = [];

      for (const post of approvedPosts) {
        let url = "https://reddit.com" + post.target_permalink;
        if (messagesContent.includes(url)) break;
        toPost.push(url);
      }

      for (const post of toPost.reverse()) channel.send(post);
    }, 5 * 60 * 1000);
  };
};
