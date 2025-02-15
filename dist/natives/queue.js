"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../classes/structures/ForgeLink");
exports.default = new forgescript_1.NativeFunction({
    name: '$queue',
    description: 'displays the queue/all tracks in a specific guild',
    brackets: false,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredGuild('Guild ID', 'The ID of the guild '),
    ],
    output: forgescript_1.ArgType.Json,
    execute: async function (ctx, [guild]) {
        const kazagumo = ctx.client.getExtension(ForgeLink_1.ForgeLink, true).kazagumo;
        const player = kazagumo.getPlayer((guild.id ?? ctx.guild.id));
        if (!player)
            return this.customError("No player found!");
        const queue = player.queue.map((track, index) => ({
            position: index + 1,
            title: track.title,
            author: track.author,
            duration: track.length,
            url: track.uri
        }));
        return this.successJSON({ guildId: guild, tracks: queue });
    }
});
