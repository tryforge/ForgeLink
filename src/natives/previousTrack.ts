import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import type { BaseChannel, VoiceBasedChannel } from 'discord.js'
import { ForgeLink } from '@structures/ForgeLink'


export default new NativeFunction({
    name: '$previousTrack',
    description: 'goes to previous track',
    brackets: true,
    unwrap: true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild')
    ],
    output: ArgType.String,
    execute: async function(ctx, [guild]) {
        const kazagumo = ctx.client.getExtension(ForgeLink, true).kazagumo

        const player = kazagumo.getPlayer(guild.id); 
if (!player) return this.customError("No player found!");

const previous = await player.getPrevious();

if (!previous) return this.success("No previous track found!");
player.play(player.getPrevious(true))

return this.success();
    }
})