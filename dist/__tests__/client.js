"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const dotenv_1 = require("dotenv");
const discord_js_1 = require("discord.js");
const __1 = require("..");
const LavalinkOpCodes_1 = require("rawrlink/dist/typings/enums/LavalinkOpCodes");
(0, dotenv_1.config)();
const lava = new __1.LavaForge({
    clientId: "1104838193276268705",
    nodes: [
        {
            reconnection: {
                retryAfter: 2500
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
        LavalinkOpCodes_1.LavalinkOpCodes.Ready
    ]
});
const client = new forgescript_1.ForgeClient({
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
    restrictions: {},
    optionalGuildID: true,
    extensions: [
        lava
    ]
});
console.log("Started");
lava.commands.add({
    type: LavalinkOpCodes_1.LavalinkOpCodes.Ready,
    code: "$log[uwu]"
});
client.commands.add({
    type: discord_js_1.Events.GuildAuditLogEntryCreate,
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
});
client.commands.add({
    type: discord_js_1.Events.GuildMemberAdd,
    code: "$sendMessage[1146874219515346984;<@$authorID> has joined using invite code $inviterCode by <@$inviterID>]"
});
client.commands.add({
    type: discord_js_1.Events.ClientReady,
    code: `$log[Ready on client $username[$botID]]
    $setStatus[online;Custom;hi bro;hi bro]`
});
client.commands.add({
    name: "eval",
    aliases: ["ev"],
    type: "messageCreate",
    code: "$eval[$message;true]",
    unprefixed: true
});
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
});
client.commands.add({
    name: "djs",
    type: "messageCreate",
    code: "$djsEval[$message]"
});
// eslint-disable-next-line no-undef
client.login(process.env.TOKEN);
//# sourceMappingURL=client.js.map