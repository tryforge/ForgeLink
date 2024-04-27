import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { LavaForge } from "..";
import { NekoLavalinkPlayerQueue } from "rawrlink";
import { PlayerStateType } from "rawrlink/dist/typings/enums/PlayerStateType";

export default new NativeFunction({
    name: "$lavalinkRate",
    description: "Sets rate of player, returns bool",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "guild ID",
            description: "The guild to add filter on",
            rest: false,
            required: true,
            type: ArgType.Guild
        },
        {
            name: "rate",
            description: "The rate to set",
            rest: false,
            required: true,
            type: ArgType.Number
        }
    ],
    async execute(ctx, [ g, v ]) {
        const pl = LavaForge.Instance.manager.players.get(g.id)
        if (!pl) return this.success(false)
        pl.filters.timescale.setRate(v)
        return this.success(true)
    },
})