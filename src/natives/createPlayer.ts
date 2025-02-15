import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import type { BaseChannel, VoiceBasedChannel } from 'discord.js'
import { ForgeLink } from '@structures/ForgeLink'

export default new NativeFunction({
    name: '$createPlayer',
    description: 'Creates a new music player in the given guild.',
    brackets: true,
    unwrap: true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild to create the player to.'),
        {
            name: 'Voice ID',
            description: 'The voice channel to connect to.',
            type: ArgType.Channel,
            check: (c: BaseChannel) => c.isVoiceBased(),
            required: true,
            rest: false
        },
        Arg.optionalTextChannel('Text ID', 'The text channel to send messages to.')
    ],
    output: ArgType.Boolean,
    execute: async function(ctx, [guild, voiceChannel, textChannel]) {
        const kazagumo = ctx.client.getExtension(ForgeLink, true).kazagumo

        await kazagumo.createPlayer({
            guildId: guild.id,
            textId: (textChannel ?? ctx.channel).id,
            voiceId: (<VoiceBasedChannel>voiceChannel).id
        })

        return this.success(kazagumo.players.has(guild.id))
    }
})