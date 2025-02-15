"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../classes/structures/ForgeLink");
exports.default = new forgescript_1.NativeFunction({
    name: '$playTrack',
    description: 'Plays a track.',
    brackets: true,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredString('')
    ],
    execute: async function (ctx, [query]) {
        const kazagumo = ctx.client.getExtension(ForgeLink_1.ForgeLink, true).kazagumo;
        const player = await kazagumo.createPlayer({
            guildId: ctx.guild.id,
            textId: ctx.channel.id,
            voiceId: ctx.member.voice.id,
            volume: 40
        });
        let result = await kazagumo.search(query, { requester: ctx.user });
        if (!result.tracks.length)
            return this.customError('No results found!');
        if (result.type === "PLAYLIST")
            player.queue.add(result.tracks);
        else
            player.queue.add(result.tracks[0]);
        if (!player.playing && !player.paused)
            player.play();
        return this.success();
    }
});
