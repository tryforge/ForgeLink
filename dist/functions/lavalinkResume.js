"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
const PlayerStateType_1 = require("rawrlink/dist/typings/enums/PlayerStateType");
exports.default = new forgescript_1.NativeFunction({
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
            type: forgescript_1.ArgType.Guild
        }
    ],
    async execute(ctx, [g]) {
        const pl = __1.LavaForge.Instance.manager.players.get(g.id);
        if (!pl || pl.state !== PlayerStateType_1.PlayerStateType.Paused)
            return this.success(false);
        await pl.resume();
        return this.success(true);
    },
});
//# sourceMappingURL=lavalinkResume.js.map