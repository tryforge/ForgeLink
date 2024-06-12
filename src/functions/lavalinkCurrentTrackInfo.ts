import { ArgType, NativeFunction, Return } from "@tryforge/forgescript";
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
        if (!pl) return this.success()

        const track = (pl.queue as NekoLavalinkPlayerQueue).current
        if (!track) return this.success()

        return this.success(track.data.info[prop])
    },
})