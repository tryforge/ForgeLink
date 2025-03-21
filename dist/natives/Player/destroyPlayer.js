"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../../classes/structures/ForgeLink");
exports.default = new forgescript_1.NativeFunction({
    name: '$destroyPlayer',
    description: 'Destroys a music player in the given guild.',
    version: "1.0.0",
    brackets: false,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredGuild('Guild ID', 'The ID of the guild to create the player to.'),
    ],
    output: forgescript_1.ArgType.Boolean,
    execute: async function (ctx, [guild = ctx.guild]) {
        const lavalink = ctx.client.getExtension(ForgeLink_1.ForgeLink, true).lavalink;
        try {
            await lavalink.destroyPlayer((guild.id ?? ctx.guild.id));
            return this.success();
        }
        catch (error) {
            console.error(`[Player Error] Failed to destroy player of "${guild.id}":`, error);
            return this.customError(`Failed to Destroy Player: ${error.message || 'Unknown error'}`);
        }
    }
});
