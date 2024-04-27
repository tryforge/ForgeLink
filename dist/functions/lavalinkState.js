"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
const PlayerStateType_1 = require("rawrlink/dist/typings/enums/PlayerStateType");
exports.default = new forgescript_1.NativeFunction({
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
            type: forgescript_1.ArgType.Guild
        }
    ],
    async execute(ctx, [g]) {
        const pl = __1.LavaForge.Instance.manager.players.get(g.id);
        if (!pl)
            return this.success();
        return this.success(PlayerStateType_1.PlayerStateType[pl.state]);
    },
});
//# sourceMappingURL=lavalinkState.js.map