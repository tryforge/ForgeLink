"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../../classes/structures/ForgeLink");
exports.default = new forgescript_1.NativeFunction({
    name: '$playerQueueTime',
    aliases: ["$queueTime", "$queueEstimatedTime"],
    description: 'Returns the total duration of all tracks in the player queue in milliseconds.',
    version: "1.1.0",
    brackets: false,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredGuild('Guild ID', 'The ID of the guild '),
    ],
    output: forgescript_1.ArgType.String,
    execute: async function (ctx, [guild = ctx.guild]) {
        const lavalink = ctx.client.getExtension(ForgeLink_1.ForgeLink, true).lavalink;
        const player = lavalink.getPlayer((guild.id ?? ctx.guild.id));
        if (!player)
            return this.customError("No player found!");
        if (!player.queue || !player.queue.tracks.length)
            return this.success("0");
        return this.success(player.queue.utils.totalDuration());
    }
});
