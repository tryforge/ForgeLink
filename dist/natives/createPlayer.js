"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../classes/structures/ForgeLink");
exports.default = new forgescript_1.NativeFunction({
    name: '$createPlayer',
    description: 'Creates a new music player in the given guild.',
    brackets: true,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredGuild('Guild ID', 'The ID of the guild to create the player to.'),
        {
            name: 'Voice ID',
            description: 'The voice channel to connect to.',
            type: forgescript_1.ArgType.Channel,
            check: (c) => c.isVoiceBased(),
            required: true,
            rest: false
        },
        forgescript_1.Arg.optionalTextChannel('Text ID', 'The text channel to send messages to.')
    ],
    output: forgescript_1.ArgType.Boolean,
    execute: async function (ctx, [guild, voiceChannel, textChannel]) {
        const kazagumo = ctx.client.getExtension(ForgeLink_1.ForgeLink, true).kazagumo;
        await kazagumo.createPlayer({
            guildId: guild.id,
            textId: (textChannel ?? ctx.channel).id,
            voiceId: voiceChannel.id
        });
        return this.success(kazagumo.players.has(guild.id));
    }
});
