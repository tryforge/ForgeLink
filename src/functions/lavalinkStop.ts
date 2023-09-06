import { ArgType, NativeFunction, Return } from "forgescript";
import { LavaForge } from "..";
import { NekoLavalinkPlayerQueue } from "rawrlink";
import { PlayerStateType } from "rawrlink/dist/typings/enums/PlayerStateType";

export default new NativeFunction({
    name: "$lavalinkStop",
    description: "Destroys the player, returns bool",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "guild ID",
            description: "The guild to destroy player",
            rest: false,
            required: true,
            type: ArgType.Guild
        }
    ],
    async execute(ctx, [ g ]) {
        const pl = LavaForge.Instance.manager.players.get(g.id)
        if (!pl) return Return.success(false)
        return Return.success(await pl.destroy())
    },
})