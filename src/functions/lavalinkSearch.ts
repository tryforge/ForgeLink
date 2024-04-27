import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { LavaForge } from "..";
import noop from "../noop";

export default new NativeFunction({
    name: "$lavalinkSearch",
    description: "Performs a lavalink search, returns the load type, or nothing if failed",
    unwrap: true,
    args: [
        {
            name: "search",
            description: "Data to search with",
            rest: false,
            required: true,
            type: ArgType.String
        },
        {
            name: "source",
            description: "The source to search on",
            rest: false,
            required: false,
            type: ArgType.String
        }
    ],
    brackets: true,
    async execute(ctx, [ data, source ]) {
        const node = LavaForge.Instance.manager.getLeastUsedNode()
        if (!node) return this.success()
        
        const search = await node.search({
            query: data,
            source: source || "ytsearch"
        }).catch(noop)

        if (!search) return this.success()

        Reflect.set(ctx, "tracks", search.tracks)

        return this.success(search.loadType)
    },
})