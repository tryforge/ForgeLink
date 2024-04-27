"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
const PlayerStateType_1 = require("rawrlink/dist/typings/enums/PlayerStateType");
exports.default = new forgescript_1.NativeFunction({
    name: "$lavalinkSkip",
    description: "Skips current playing song, returns bool",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "guild ID",
            description: "The guild to skip track on",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.Guild
        }
    ],
    async execute(ctx, [g]) {
        const pl = __1.LavaForge.Instance.manager.players.get(g.id);
        if (!pl || pl.state === PlayerStateType_1.PlayerStateType.Idle)
            return this.success(false);
        const queue = pl.queue;
        queue.shift();
        if (queue.length)
            await queue.play(true);
        return this.success(true);
    },
});
//# sourceMappingURL=lavalinkSkip.js.map