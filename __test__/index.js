const { ForgeClient } = require('@tryforge/forgescript')
const { ForgeLink } = require('../dist')
process.loadEnvFile()

const lavalink = new ForgeLink({

    playerOptions: {
    defaultSearchPlatform: "ytsearch"
    },

    nodes: [
        {
            "identifier": "Public Lavalink v4",
            "password": "https://dsc.gg/ajidevserver",
            "host": "lava-v4.ajieblogs.eu.org",
            "port": 443,
            "secure": true,
            "sessionId": "Econome"
          }
    ]
})

const client = new ForgeClient({
    intents: [
        'Guilds',
        'GuildMessages',
        'MessageContent',
        'GuildVoiceStates'
    ],
    events: [
        'messageCreate'
    ],
    extensions: [lavalink],
    prefixes: ['.']
})

client.commands.add({
    name: 'plai',
    type: 'messageCreate',
    code: '$if[$hasPlayer[$guildID]==false;$createPlayer[$guildID;$voiceID[$guildID;$authorID];$channelID]]\n$addTrack[$guildID;$message]'
})


client.login(process.env.TOKEN)