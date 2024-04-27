import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { LavaForge } from "..";

export default new NativeFunction({
    name: "$lavalinkPitch",
    description: "Sets pitchness of player, returns bool",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "guild ID",
            description: "The guild to add pitch on",
            rest: false,
            required: true,
            type: ArgType.Guild
        },
        {
            name: "pitch",
            description: "The pitch to set",
            rest: false,
            required: true,
            type: ArgType.Number
        }
    ],
    async execute(ctx, [ g, v ]) {
        const pl = LavaForge.Instance.manager.players.get(g.id)
        if (!pl) return this.success(false)
        pl.filters.timescale.setPitch(v)
        return this.success(true)
    },
})