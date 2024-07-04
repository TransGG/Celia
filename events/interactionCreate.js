const { EmbedBuilder } = require("discord.js");

module.exports = async (client, interaction) => {
  if (interaction.isButton()) {
    const command = interaction.customId;
    if (command === "plurality") {
      const pluralityEmbed = new EmbedBuilder()
        .setColor(0xd70040)
        .setTitle("What is Plurality?")
        .setDescription(
          "Plurality is the concept of multiple people sharing a single body, inhabiting the same brain. Many people's first (or only) experience with this is from people with Dissociative Identity Disorder (DID), but there are many other situations that can cause something like this to happen -- and in many cases, the existence of a plurality is not problematic or negative. [As More Than One](<https://morethanone.info/>) states:\n\n> Plurality (or multiplicity) is the existence of multiple self-aware entities inside one physical brain. > You could think of a plural collective as a group of lifelong roommates, but with a body instead of an apartment.\n\nIn general, a group of plural entities sharing one body tends to be known as a plural system.\n\nWhen interacting with plural people, remember to treat each individual member of a plural system with respect. Don't pathologise their identity (for example, by asking to meet the \"real\" person or suggesting that they need to be \"cured\"), and remember that many plural people consider their identity more a matter of philosophy than of medicine. Additionally, treat each system member as separate people, with their own memories, experiences and personality -- If they ask you to treat them in a specific way, listen to them and follow their lead as best you can.\n\nIt's also worth noting that plurality is a whole world and plural systems often greatly differ from each other, sometimes identifying or manifesting themselves in completely different ways. All plural systems are valid, regardless of how their members identify or interact, how they were formed, or how they think about themselves. > \n\nTaken from [QuiltMC's PluralKit Info Page](<https://quiltmc.org/en/community/pluralkit/>)"
        );

      interaction.reply({ embeds: [pluralityEmbed], ephemeral: true });
    } else if (command === "ack-and-del-no-ping-reply") {
      await interaction.message.delete().catch(() => null);
    }
  }
};
