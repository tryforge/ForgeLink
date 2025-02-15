import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import type { BaseChannel, VoiceBasedChannel } from 'discord.js'
import { ForgeLink } from '@structures/ForgeLink'
import { KazagumoTrack } from 'kazagumo'
import { info } from 'console'

export default new NativeFunction({
    name: '$currentTrackInfo',
    description: 'Gets info on a track in a specific guild',
    brackets: true,
    unwrap: true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild'),
    ],
    output: ArgType.Json,
    execute: async function(ctx, [guild]) {
        const kazagumo = ctx.client.getExtension(ForgeLink, true).kazagumo

        const player = kazagumo.getPlayer(guild.id); 
if (!player) return this.customError("No player found!");

return this.successJSON(player.queue.current.getRaw());
    }
})