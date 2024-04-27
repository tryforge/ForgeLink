"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$lavalinkTracks",
    description: "Returns JSON of all tracks",
    unwrap: true,
    execute(ctx) {
        const tracks = Reflect.get(ctx, "tracks");
        return tracks !== undefined ? this.success(tracks.map(x => x.data.info)) : this.success();
    }
});
//# sourceMappingURL=lavalinkTracks.js.map