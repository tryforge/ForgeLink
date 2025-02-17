import { ArgType, NativeFunction, Return } from "forgescript";
import { LavaForge } from "..";
import { BaseChannel } from "discord.js";
import { NekoLavalinkPlayerQueue, NekoTrack } from "rawrlink";

export default new NativeFunction({
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
            type: ArgType.Guild
        },
        {
            name: "channel ID",
            description: "The channel to play this song on",
            rest: false,
            type: ArgType.Channel,
            check: (i: BaseChannel) => i.isVoiceBased(),
            required: true
        },
        {
            name: "index",
            description: "The track index that was loaded via $lavalinkSearch, leave empty to load all.",
            rest: false,
            type: ArgType.Number
        },
        {
            name: "self deaf",
            description: "Whether to join deafened",
            rest: false,
            type: ArgType.Boolean
        }
    ],
    async execute(ctx, [ guild, voice, index, deaf ]) {
        const node = LavaForge.Instance.manager.getLeastUsedNode()
        if (!node) return Return.success()
        
        const tracks = (Reflect.get(ctx, "tracks") as NekoTrack[])
        const track = tracks?.[index!]

        if ((index !== null && !track) || !tracks?.length) return Return.success()

        const pl = LavaForge.Instance.manager.player(node, guild.id)
        
        await pl.join(voice.id, deaf || false)
        
        const queue = (pl.queue ??= new NekoLavalinkPlayerQueue(pl)) as NekoLavalinkPlayerQueue
        if (track) 
            queue.push(track)
        else 
            queue.push(...tracks)

        return Return.success(await queue.play())
    },
})