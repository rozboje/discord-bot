const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

class Verify {
  constructor(client, verifyrole) {
    this.client = client;
    this.verifyrole = verifyrole;
  }

  async handleInteraction(interaction) {
    if (interaction.isCommand() && interaction.commandName === 'verify') {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: "your server - verify",
          iconURL: "https://avatars.githubusercontent.com/u/99695314?v=4"
        })
        .setDescription('> *Press* **`✅Verify!`** *to* **verify** *yourself!*\n> *For* **help** *open ticket:* <#your_channel_id>')
        .setThumbnail("https://avatars.githubusercontent.com/u/99695314?v=4")
        .setFooter({
          text: "@rozboje for your server",
          iconURL: "https://avatars.githubusercontent.com/u/99695314?v=4"
        })
        .setColor("#fdfdfd");

      const verify = new ButtonBuilder()
        .setCustomId('verify_button')
        .setLabel('Verify!')
        .setStyle(ButtonStyle.Success)
        .setEmoji('✅');

      const website = new ButtonBuilder()
        .setLabel('Website!')
        .setURL('https://rozboje.pl')
        .setStyle(ButtonStyle.Link)
        .setEmoji('🌐');

      const row = new ActionRowBuilder().addComponents(verify, website);

      await interaction.channel.send({ embeds: [embed], components: [row] });
    }

    if (interaction.isButton() && interaction.customId === 'verify_button') {
      const member = interaction.guild.members.cache.get(interaction.user.id);
      const role = interaction.guild.roles.cache.get(this.verifyrole);
      
      if (role && member) {
        if (member.roles.cache.has(this.verifyrole)) {
          await interaction.reply({ content: 'You already have a role!', ephemeral: true });
        } else {
          await member.roles.add(role);
          await interaction.reply({ content: 'You have been verified!', ephemeral: true });
        }
      }
    }
  }
}

module.exports = Verify;
