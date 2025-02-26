const { ForgeClient } = require('@tryforge/forgescript')
const { ForgeLink } = require('../dist')


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
            name: 'Muzykant v4',
            auth: 'https://discord.gg/v6sdrD9kPh',
            url: 'lavalink_v4.muzykant.xyz:80',
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

client.commands.add({
    name: 'eval',
    type: 'messageCreate',
    code: '$eval[$replaceText[$message;Token;gfys]]'
})

client.commands.add({
    name: 'djs',
    type: 'messageCreate',
    code: '$djsEval[$replaceText[$message;Token;gfys]]'
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

client.login("")