import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import type { BaseChannel, VoiceBasedChannel } from 'discord.js'
import { ForgeLink } from '@structures/ForgeLink'


export default new NativeFunction({
    name: '$setVolume',
    description: 'Sets the guild player volume/loudness (recomended limit:200) ',
    brackets: true,
    unwrap: true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild'),
        {
            name: 'volume',
            description: 'volume',
            type: ArgType.Number,
            required: true,
            rest: false
        }
    ],
    output: ArgType.String,
    execute: async function(ctx, [guild = ctx.guild, volume]) {
        const kazagumo = ctx.client.getExtension(ForgeLink, true).kazagumo

        const player = kazagumo.getPlayer((guild.id ?? ctx.guild.id)); 
if (!player) return this.customError("No player found!");

await player.setVolume(volume)

return this.success();
    }
})