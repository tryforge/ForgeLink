import { ArgType, NativeFunction, Return } from "@tryforge/forgescript";
import { NekoTrack } from "rawrlink";

export default new NativeFunction({
    name: "$lavalinkTrackInfo",
    description: "Returns track info from given track index",
    unwrap: true,
    args: [
        {
            name: "index",
            description: "The track index",
            type: ArgType.Number,
            rest: false,
            required: true
        },
        {
            name: "property",
            description: "The property to get of this info",
            rest: false,
            required: true,
            type: ArgType.String
        }
    ],
    execute(ctx, [ index, prop ]) {
        const track = (Reflect.get(ctx, "tracks") as NekoTrack[] | undefined)?.[index]
        if (!track) return this.success()

        return this.success(track.data.info[prop])
    },
})