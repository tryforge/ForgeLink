"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../classes/structures/ForgeLink");
exports.default = new forgescript_1.NativeFunction({
    name: '$currentTrackInfo',
    description: 'Gets info on a track in a specific guild',
    brackets: true,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredGuild('Guild ID', 'The ID of the guild'),
    ],
    output: forgescript_1.ArgType.Json,
    execute: async function (ctx, [guild]) {
        const kazagumo = ctx.client.getExtension(ForgeLink_1.ForgeLink, true).kazagumo;
        const player = kazagumo.getPlayer(guild.id);
        if (!player)
            return this.customError("No player found!");
        return this.successJSON(player.queue.current.getRaw());
    }
});
