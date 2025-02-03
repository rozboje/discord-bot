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
          name: "your server - welcome",
          iconURL: "https://avatars.githubusercontent.com/u/99695314?v=4"
        })
        .setDescription(`> *Welcome* ${userPing} *to* **your server**!\n> *In the first step* **verify yourself** *on the server!*\n> *You can do it on the channel* <#your_channel_id>`)
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter({
          text: "$ u8n for rainbypass.club",
          iconURL: "https://avatars.githubusercontent.com/u/99695314?v=4"
        })
        .setColor("#fdfdfd")
        .setTimestamp();

      await channel.send({ content: `${userPing}`, embeds: [embed] });
    }
  }
}

module.exports = Welcome;
