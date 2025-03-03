import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeLink } from '@structures/ForgeLink';

export default new NativeFunction({
    name: '$searchEngine',
    description: 'Sets the player\'s search engine.',
    version: "1.1.0",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'Engine',
            description: 'The engine to use (ytsearch, scsearch, spsearch).',
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    output: ArgType.Json,
    execute: async function(ctx, [engine]) {
        const kazagumo = ctx.client.getExtension(ForgeLink, true).kazagumo;

        if (!kazagumo) return this.customError("Kazagumo is not initialized.");
   
        kazagumo.KazagumoOptions.defaultSource = engine + ":";

        return this.successJSON({ message: `Search engine set to: ${engine}` });
    }
});
