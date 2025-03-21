import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import type { BaseChannel, VoiceBasedChannel } from 'discord.js'
import { ForgeLink } from '@structures/ForgeLink'
import { LavalinkManager } from '@managers/LavalinkCommandManager'
import { Player } from 'lavalink-client/dist/types'

export default new NativeFunction({
    name: '$destroyPlayer',
    description: 'Destroys a music player in the given guild.',
    version: "1.0.0",
    brackets: false,
    unwrap: true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild to create the player to.'),
    ],
    output: ArgType.Boolean,
    execute: async function(ctx, [guild = ctx.guild]) {
        const lavalink = ctx.client.getExtension(ForgeLink, true).lavalink

        try {
            await lavalink.destroyPlayer((guild.id ?? ctx.guild.id));
            return this.success();
        } catch (error) {
            console.error(`[Player Error] Failed to destroy player of "${guild.id}":`, error);
            return this.customError(`Failed to Destroy Player: ${error.message || 'Unknown error'}`);
        }
    }
})