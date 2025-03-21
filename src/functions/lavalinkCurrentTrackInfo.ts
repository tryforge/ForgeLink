import { ArgType, NativeFunction, Return } from "forgescript";
import { NekoLavalinkPlayerQueue, NekoTrack } from "rawrlink";
import { LavaForge } from "..";

export default new NativeFunction({
    name: "$lavalinkCurrentTrackInfo",
    description: "Returns track info of current playing track",
    unwrap: true,
    args: [
        {
            name: "guild ID",
            description: "The guild to get player from",
            rest: false,
            required: true,
            type: ArgType.Guild
        },
        {
            name: "property",
            description: "The property to get of this info",
            rest: false,
            required: true,
            type: ArgType.String
        }
    ],
    brackets: true,
    execute(ctx, [ g, prop ]) {
        const pl = LavaForge.Instance.manager.players.get(g.id)
        if (!pl) return Return.success()

        const track = (pl.queue as NekoLavalinkPlayerQueue).current
        if (!track) return Return.success()

        return Return.success(track.data.info[prop])
    },
})