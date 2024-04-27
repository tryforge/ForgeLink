import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { LavaForge } from "..";

export default new NativeFunction({
    name: "$lavalinkClearFilters",
    description: "Clears filters of a player",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "guild ID",
            description: "The guild to clear filters on",
            rest: false,
            required: true,
            type: ArgType.Guild
        }
    ],
    async execute(ctx, [ g ]) {
        const pl = LavaForge.Instance.manager.players.get(g.id)
        if (!pl) return this.success(false)
        pl.filters.clear()
        await pl.applyFilters()
        return this.success(true)
    },
})