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
          name: ".gg/raining - verify",
          iconURL: "https://cdn.discordapp.com/attachments/1334339978091823124/1334345294531264523/5f8BXX1.jpg?ex=67b29ae5&is=67b14965&hm=3f199fa90b33d873410555262b9c7d371aa1955a0410db90280811fc9619f4f2&"
        })
        .setDescription('> *Press* **`✅ Verify!`** *to* **verify** *yourself!*\n> *For* **help** *open ticket:* <#1334437112484724798>')
        .setThumbnail("https://cdn.discordapp.com/attachments/1334339978091823124/1335847561830994004/Hwt8WMZ.png?ex=67b2233d&is=67b0d1bd&hm=b3610fe78e42ffb73e45e35456266d380797952bf2dcde968c9baa176a663ca6&")
        .setFooter({
          text: "smudge for raining.club",
          iconURL: "https://cdn.discordapp.com/attachments/1334339978091823124/1340513506641838081/181e98c8bc.png?ex=67b2a1fd&is=67b1507d&hm=ad71335ee1f91511f979cf2b93a4ec30fb1beda1aa2721cb2830a66330d45afe&"
        })
        .setColor("#fdfdfd");

      const verify = new ButtonBuilder()
        .setCustomId('verify_button')
        .setLabel('Verify!')
        .setStyle(ButtonStyle.Success)
        .setEmoji('✅');

      const why = new ButtonBuilder()
        .setCustomId('why_button')
        .setLabel('Why do I need verify?')
        .setStyle(ButtonStyle.Secondary)
        .setEmoji('❔');

      const row = new ActionRowBuilder().addComponents(verify, why);

      await interaction.channel.send({ embeds: [embed], components: [row] });
    }

    if (interaction.isButton() && interaction.customId === 'verify_button') {
      const member = interaction.guild.members.cache.get(interaction.user.id);
      const role = interaction.guild.roles.cache.get(this.verifyrole);
      
      if (role && member) {
        if (member.roles.cache.has(this.verifyrole)) {
          await interaction.reply({ content: '**`✅ Verify!`** *- You already have a role!*', ephemeral: true });
        } else {
          await member.roles.add(role);
          await interaction.reply({ content: '**`✅ Verify!`** *- You have been verified!*', ephemeral: true });
        }
      }
    }
    
    if (interaction.isButton() && interaction.customId === 'why_button') {
      await interaction.reply({ content: '**`❔ Why do I need verify?`** *- We add verification to make sure every person on our Discord server is a real account.*', ephemeral: true });
    }
  }
}

module.exports = Verify;
