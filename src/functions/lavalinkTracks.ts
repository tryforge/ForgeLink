import { NativeFunction, Return } from "@tryforge/forgescript";
import { NekoTrack } from "rawrlink";

export default new NativeFunction({
    name: "$lavalinkTracks",
    description: "Returns JSON of all tracks",
    unwrap: true,
    execute(ctx) {
        const tracks = Reflect.get(ctx, "tracks") as NekoTrack[] | undefined
        return tracks !== undefined ? this.success(
            tracks.map(x => x.data.info) as any
        ) : this.success() 
    }
})