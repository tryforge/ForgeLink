"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$lavalinkTrackInfo",
    description: "Returns track info from given track index",
    unwrap: true,
    args: [
        {
            name: "index",
            description: "The track index",
            type: forgescript_1.ArgType.Number,
            rest: false,
            required: true
        },
        {
            name: "property",
            description: "The property to get of this info",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.String
        }
    ],
    execute(ctx, [index, prop]) {
        const track = Reflect.get(ctx, "tracks")?.[index];
        if (!track)
            return this.success();
        return this.success(track.data.info[prop]);
    },
});
//# sourceMappingURL=lavalinkTrackInfo.js.map