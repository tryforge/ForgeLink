import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { LavaForge } from "..";
import { PlayerStateType } from "rawrlink/dist/typings/enums/PlayerStateType";

export default new NativeFunction({
    name: "$lavalinkResume",
    description: "Resumes current playing song, returns bool",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "guild ID",
            description: "The guild to resume track on",
            rest: false,
            required: true,
            type: ArgType.Guild
        }
    ],
    async execute(ctx, [ g ]) {
        const pl = LavaForge.Instance.manager.players.get(g.id)
        if (!pl || pl.state !== PlayerStateType.Paused) return this.success(false)

        await pl.resume()

        return this.success(true)
    },
})