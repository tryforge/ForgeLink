const { ForgeClient } = require('@tryforge/forgescript')
const { ForgeLink } = require('../dist')


const lavalink = new ForgeLink({
nodes: [
        {
            id: "Public Lavalink v4",
            authorization: "https://dsc.gg/ajidevserver",
            host: "lava-v4.ajieblogs.eu.org",
            port: 443,
            secure: true
          }
    ],
    playerOptions: {
        defaultSearchPlatform: "ytsearch"
        }
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


client.login("")