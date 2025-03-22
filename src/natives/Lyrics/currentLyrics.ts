import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeLink } from '@structures/ForgeLink';

export default new NativeFunction({
    name: '$getLyrics',
    description: 'Fetches lyrics for the currently playing track in the guild.',
    brackets: false,
    unwrap: true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild to fetch lyrics from.')
    ],
    output: ArgType.String,
    execute: async function(ctx, [guild]) {
        const lavalink = ctx.client.getExtension(ForgeLink, true).lavalink;

        if (!lavalink) {
            return this.customError('Lavalink is not initialized.');
        }

        const player = lavalink.players.get(guild.id);
        if (!player) {
            return this.customError('No active player found for this guild.');
        }

        try {
            const lyrics = await player.getCurrentLyrics();
            if (!lyrics || !lyrics.text) {
                return this.customError('No lyrics found for the current track.');
            }

            return this.success(lyrics.text);
        } catch (error) {
            console.error(`[Lavalink] Error fetching lyrics:`, error);
            return this.customError('An error occurred while fetching lyrics.');
        }
    }
});
