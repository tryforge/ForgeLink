import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { LavaForge } from "..";

export default new NativeFunction({
    name: "$lavalinkVolume",
    description: "Sets volume of player, returns bool",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "guild ID",
            description: "The guild to pause track on",
            rest: false,
            required: true,
            type: ArgType.Guild
        },
        {
            name: "volume",
            description: "The volume to set",
            rest: false,
            required: true,
            type: ArgType.Number
        }
    ],
    async execute(ctx, [ g, v ]) {
        const pl = LavaForge.Instance.manager.players.get(g.id)
        if (!pl) return this.success(false)
        await pl.setVolume(v)
        return this.success(true)
    },
})