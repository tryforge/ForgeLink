import { ForgeClient } from "forgescript"
import { config } from "dotenv"
import { Events } from "discord.js"
import { LavaForge } from ".."
import { LavalinkOpCodes } from "rawrlink/dist/typings/enums/LavalinkOpCodes"

config()

const lava = new LavaForge({
    clientId: "1104838193276268705",
    nodes: [
        {
            reconnection: {
                retryAfter: 2_500
            },
            connection: {
                host: '127.0.0.1',
                name: 'uwu',
                password: 'ruben',
                port: 2333
            }
        }
    ],
    events: [
        LavalinkOpCodes.Ready
    ]
})

const client = new ForgeClient({
    intents: [
        "Guilds",
        "MessageContent",
        "GuildMessages",
        "GuildMembers",
        "DirectMessages",
        "GuildInvites",
        "GuildModeration",
        "GuildVoiceStates"
    ],
    events: [
        "messageCreate",
        "ready",
        "guildAuditLogEntryCreate",
        "guildMemberAdd",
        "interactionCreate"
    ],
    useInviteSystem: true,
    prefixes: [
        "!"
    ],
    restrictions: {
    },
    optionalGuildID: true,
    extensions: [
        lava
    ]
})

console.log(
    "Started"
)

lava.addCommand({
    type: LavalinkOpCodes.Ready,
    code: "$log[uwu]"
})

client.functions.add(
    "get_user",
    [ "id" ],
    "$return[$username[$env[id]]]"
)

client.commands.add({
    type: Events.GuildAuditLogEntryCreate,
    code: `
    $sendMessage[1148787451490476092;
        Executor Id: $auditLog[executorID]
        Target Id: $auditLog[targetID]
        Action Type: $auditLog[actionType]
        Target Type: $auditLog[targetType]
        Changes: $auditLog[changes]
        Extras: $auditLog[extra]
    ]
    `
})

client.commands.add({
    type: Events.GuildMemberAdd,
    code: "$sendMessage[1146874219515346984;<@$authorID> has joined using invite code $inviterCode by <@$inviterID>]"
})

client.commands.add({
    type: Events.ClientReady,
    code: `$log[Ready on client $username[$botID]]
    $setStatus[online;Custom;hi bro;hi bro]`
})

client.commands.add({
    name: "eval",
    aliases: [ "ev" ],
    type: "messageCreate",
    code: "$eval[$message;true]",
    unprefixed: true
})

client.commands.add({
    type: "interactionCreate",
    code: `$if[$isButton==false;
        $log[Not a button, modal?: $isModal, field value: $input[hello]]
    ;
        $log[Modal!]
        $modal[hello;Hi bro]
        $addTextInput[hello;wsg;Short;true]
    ]
    `
})

client.commands.add({
    name: "djs",
    type: "messageCreate",
    code: "$djsEval[$message]"
})


// eslint-disable-next-line no-undef
client.login(process.env.TOKEN)