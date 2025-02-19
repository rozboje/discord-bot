const { EmbedBuilder } = require('discord.js');

class Welcome {
  constructor(client, welcomeid) {
    this.client = client;
    this.welcomeid = welcomeid;
  }

  async sendWelcomeMessage(member) {
    const channel = await this.client.channels.fetch(this.welcomeid);
    if (channel) {
      const userPing = member.user.toString();

      const embed = new EmbedBuilder()
        .setAuthor({
          name: ".gg/raining - welcome",
          iconURL: "https://cdn.discordapp.com/attachments/1334339978091823124/1334345294531264523/5f8BXX1.jpg?ex=67b29ae5&is=67b14965&hm=3f199fa90b33d873410555262b9c7d371aa1955a0410db90280811fc9619f4f2&"
        })
        .setDescription(`> *Welcome* ${userPing} *to* **.gg/raining**!\n> *In the first step* **verify yourself** *on the server!*\n> *You can do it on the channel* <#1334333103371452447>`)
        .setFooter({
          text: "smudge for raining.club",
          iconURL: "https://cdn.discordapp.com/attachments/1334339978091823124/1340513506641838081/181e98c8bc.png?ex=67b2a1fd&is=67b1507d&hm=ad71335ee1f91511f979cf2b93a4ec30fb1beda1aa2721cb2830a66330d45afe&"
        })
        .setColor("#fdfdfd")
        .setTimestamp()
        .setThumbnail(member.user.displayAvatarURL());

      await channel.send({ content: `${userPing}`, embeds: [embed] });
    }
  }
}

module.exports = Welcome;
