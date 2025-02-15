"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../classes/structures/ForgeLink");
exports.default = new forgescript_1.NativeFunction({
    name: '$removeTrack',
    description: 'Removes a track in a specific guild',
    brackets: true,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredGuild('Guild ID', 'The ID of the guild'),
        {
            name: 'Position',
            description: 'track position',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        }
    ],
    output: forgescript_1.ArgType.String,
    execute: async function (ctx, [guild, position]) {
        const kazagumo = ctx.client.getExtension(ForgeLink_1.ForgeLink, true).kazagumo;
        const player = kazagumo.getPlayer(guild.id);
        if (!player)
            return this.customError("No player found!");
        player.queue.remove(position);
        return this.success();
    }
});
