import { ArgType, NativeFunction, Return } from "forgescript";
import { LavaForge } from "..";
import { NekoLavalinkPlayerQueue } from "rawrlink";
import { PlayerStateType } from "rawrlink/dist/typings/enums/PlayerStateType";

export default new NativeFunction({
    name: "$lavalinkPause",
    description: "Pauses current playing song, returns bool",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "guild ID",
            description: "The guild to pause track on",
            rest: false,
            required: true,
            type: ArgType.Guild
        }
    ],
    async execute(ctx, [ g ]) {
        const pl = LavaForge.Instance.manager.players.get(g.id)
        if (!pl || pl.state !== PlayerStateType.Playing) return Return.success(false)

        await pl.pause()

        return Return.success(true)
    },
})