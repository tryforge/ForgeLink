"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
exports.default = new forgescript_1.NativeFunction({
    name: "$lavalinkQueue",
    description: "Returns valid JSON format of all tracks in queue",
    brackets: true,
    args: [
        {
            name: "guild ID",
            description: "The guild to pull queue from",
            rest: false,
            type: forgescript_1.ArgType.Guild,
            required: true
        }
    ],
    unwrap: true,
    async execute(ctx, [g]) {
        const pl = __1.LavaForge.Instance.manager.players.get(g.id);
        if (!pl)
            return this.success();
        return this.successJSON(pl.queue.map(x => x.data.info));
    },
});
//# sourceMappingURL=lavalinkQueue.js.map