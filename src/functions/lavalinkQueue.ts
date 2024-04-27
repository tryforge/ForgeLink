import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { LavaForge } from "..";
import { NekoLavalinkPlayerQueue } from "rawrlink";

export default new NativeFunction({
    name: "$lavalinkQueue",
    description: "Returns valid JSON format of all tracks in queue",
    brackets: true,
    args: [
        {
            name: "guild ID",
            description: "The guild to pull queue from",
            rest: false,
            type: ArgType.Guild,
            required: true
        }
    ],
    unwrap: true,
    async execute(ctx, [ g ]) {
        const pl = LavaForge.Instance.manager.players.get(g.id)
        if (!pl) return this.success()
        return this.successJSON((pl.queue as NekoLavalinkPlayerQueue).map(x => x.data.info) as any)
    },
})