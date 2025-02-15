const { ForgeClient } = require('@tryforge/forgescript')
const { ForgeLink } = require('../dist')
process.loadEnvFile()

const lavalink = new ForgeLink({
    events: {
        kazagumo: ['playerStart'],
        shoukaku: ['debug', 'ready']
    },
    kazagumoOptions: {
        defaultSearchEngine: 'youtube'
    },
    nodes: [
        {
            name: 'INZEWORLD.COM (DE)',
            auth: 'saher.inzeworld.com',
            url: 'lava.inzeworld.com:3128',
            secure: false
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

lavalink.commands.kazagumo.add({
    type: 'playerStart',
    code: '$log[A track started playing now.]'
})

lavalink.commands.shoukaku.add({
    type: 'debug',
    code: '$log[NODE "$env[name]" -> $env[info]]'
},{
    type: 'ready',
    code: '$log[NODE "$env[name]" IS READY]'
})

client.login(process.env.TOKEN)