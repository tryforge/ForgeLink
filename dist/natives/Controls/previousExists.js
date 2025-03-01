"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../../classes/structures/ForgeLink");
exports.default = new forgescript_1.NativeFunction({
    name: '$previousExists',
    description: 'Check whether a previous track exists in the player queue.',
    version: "1.0.2",
    brackets: false,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredGuild('Guild ID', 'The ID of the guild to check the player for.')
    ],
    output: forgescript_1.ArgType.Boolean,
    execute: async function (ctx, [guild = ctx.guild]) {
        const kazagumo = ctx.client.getExtension(ForgeLink_1.ForgeLink, true).kazagumo;
        const player = kazagumo.getPlayer((guild.id ?? ctx.guild.id));
        if (!player)
            return this.customError("No player found!");
        const hasPrevious = player.queue.previous?.[0];
        const currentTrack = player.queue.current;
        const isValid = !!(hasPrevious && currentTrack && hasPrevious.uri !== currentTrack.uri);
        return this.success(isValid);
    }
});
