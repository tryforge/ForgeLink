import { ArgType, NativeFunction, Return } from "forgescript";
import { LavaForge } from "..";
import { NekoLavalinkPlayerQueue } from "rawrlink";
import { PlayerStateType } from "rawrlink/dist/typings/enums/PlayerStateType";

export default new NativeFunction({
    name: "$lavalinkState",
    description: "Returns state of a player",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "guild ID",
            description: "The guild to return player state",
            rest: false,
            required: true,
            type: ArgType.Guild
        }
    ],
    async execute(ctx, [ g ]) {
        const pl = LavaForge.Instance.manager.players.get(g.id)
        if (!pl) return Return.success()
        return Return.success(PlayerStateType[pl.state])
    },
})