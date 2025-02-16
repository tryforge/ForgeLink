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
        const queueTracks = [];
        if (player.queue.current) {
            queueTracks.push({
                trackTitle: player.queue.current.getRaw().info.title,
                trackAuthor: player.queue.current.getRaw().info.author
            });
        }
        // Get the rest of the queued tracks
        const queueSize = Number(player.queue.totalSize.toFixed());
        for (let i = 0; i < queueSize; i++) {
            const track = player.queue.at(i);
            if (track) {
                queueTracks.push({
                    trackTitle: track.getRaw().info.title,
                    trackAuthor: track.getRaw().info.author
                });
            }
        }
        return this.successJSON({ guildId: guild.id, tracks: queueTracks });
    }
});
