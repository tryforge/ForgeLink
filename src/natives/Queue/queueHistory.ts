import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeLink } from '@structures/ForgeLink';
import { KazagumoTrack } from 'kazagumo';

export default new NativeFunction({
    name: '$queueHistory',
    description: 'Displays the history of previously played tracks from the guild player.',
    version: "1.1.0",
    brackets: false,
    experimental: true,
    unwrap: true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild'),
    ],
    output: ArgType.Json,
    execute: async function(ctx, [guild = ctx.guild]) {
        const kazagumo = ctx.client.getExtension(ForgeLink, true).kazagumo;

        const player = kazagumo.getPlayer(guild.id ?? ctx.guild.id);
        if (!player) return this.customError("No player found!");

        const historyTracks = [];

        
        const previousTracks = player.queue.previous || [];
        if (previousTracks.length) {
            for (const track of previousTracks) {
                historyTracks.push({
                    trackSource: track.sourceName,
                    trackTitle: track.title,
                    trackAuthor: track.author,
                    trackUri: track.uri
                });
            }
        }

        return this.successJSON({
            guildId: guild.id,
            history: historyTracks
        });
    }
});
