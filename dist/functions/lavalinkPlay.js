"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
const rawrlink_1 = require("rawrlink");
exports.default = new forgescript_1.NativeFunction({
    name: "$lavalinkPlay",
    brackets: true,
    description: "Plays given song url, will return true if playing now, or false if somethings already playing, if empty response there was an error.",
    unwrap: true,
    args: [
        {
            name: "guild ID",
            description: "The guild to play this song on",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.Guild
        },
        {
            name: "channel ID",
            description: "The channel to play this song on",
            rest: false,
            type: forgescript_1.ArgType.Channel,
            check: (i) => i.isVoiceBased(),
            required: true
        },
        {
            name: "index",
            description: "The track index that was loaded via $lavalinkSearch, leave empty to load all.",
            rest: false,
            type: forgescript_1.ArgType.Number
        },
        {
            name: "self deaf",
            description: "Whether to join deafened",
            rest: false,
            type: forgescript_1.ArgType.Boolean
        }
    ],
    async execute(ctx, [guild, voice, index, deaf]) {
        const node = __1.LavaForge.Instance.manager.getLeastUsedNode();
        if (!node)
            return this.success();
        const tracks = Reflect.get(ctx, "tracks");
        const track = tracks?.[index];
        if ((index !== null && !track) || !tracks?.length)
            return this.success();
        const pl = __1.LavaForge.Instance.manager.player(node, guild.id);
        await pl.join(voice.id, deaf || false);
        const queue = (pl.queue ??= new rawrlink_1.NekoLavalinkPlayerQueue(pl));
        if (track)
            queue.push(track);
        else
            queue.push(...tracks);
        return this.success(await queue.play());
    },
});
//# sourceMappingURL=lavalinkPlay.js.map