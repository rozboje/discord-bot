const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const config = require('./config.json');

const Welcome = require('./handlers/Welcome');
const Verify = require('./handlers/Verify');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions
  ]
});

client.once('ready', async () => {
  console.log(`bot: ${client.user.tag}`);

  const commands = [
    {
      name: 'verify',
      description: '.gg/raining - Sends verification on the channel where the command is entered'
    }
  ];

  const valueKeys = 0;

  client.user.setPresence({
    activities: [{
      name: `active keys: ${valueKeys}`,
      type: 2
    }]
  });

  const rest = new REST({ version: '10' }).setToken(config.token);
  try {
    console.log('running command [/]');
    await rest.put(
      Routes.applicationGuildCommands(client.user.id, config.serverid),
      { body: commands }
    );
    console.log('reloading command [/]');
  } catch (error) {
    console.error(error);
  }
});

const welcomeHandler = new Welcome(client, config.welcomeid);
const verifyHandler = new Verify(client, config.verifyrole);

client.on('guildMemberAdd', member => welcomeHandler.sendWelcomeMessage(member));
client.on('interactionCreate', interaction => verifyHandler.handleInteraction(interaction));

client.login(config.token);
