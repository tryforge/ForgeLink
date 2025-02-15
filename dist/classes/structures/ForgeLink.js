"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeLink = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const shoukaku_1 = require("shoukaku");
const kazagumo_1 = require("kazagumo");
const KazagumoCommandManager_1 = require("../managers/KazagumoCommandManager");
const ShoukakuCommandManager_1 = require("../managers/ShoukakuCommandManager");
const path_1 = require("path");
class ForgeLink extends forgescript_1.ForgeExtension {
    options;
    name = 'ForgeLink';
    description = '...';
    version = '...';
    #e = null;
    #kc;
    #sc;
    constructor(options) {
        super();
        this.options = options;
    }
    init(client) {
        this.#e = new kazagumo_1.Kazagumo({
            ...this.options.kazagumoOptions,
            send(guildId, payload) {
                const guild = client.guilds.cache.get(guildId);
                if (guild)
                    guild.shard.send(payload);
            },
        }, new shoukaku_1.Connectors.DiscordJS(client), this.options.nodes, this.options.shoukakuOptions);
        this.#kc = new KazagumoCommandManager_1.KazagumoCommandManager(client);
        this.#sc = new ShoukakuCommandManager_1.ShoukkauCommandManager(client);
        forgescript_1.FunctionManager.load('ForgeLink', (0, path_1.join)(__dirname, '../../natives'));
        forgescript_1.EventManager.load('kazagumoCommands', (0, path_1.join)(__dirname, '../../events/kazagumo'));
        forgescript_1.EventManager.load('shoukakuCommands', (0, path_1.join)(__dirname, '../../events/shoukaku'));
        client.events.load('kazagumoCommands', this.options.events?.kazagumo ?? []);
        client.events.load('shoukakuCommands', this.options.events?.shoukaku ?? []);
    }
    get kazagumo() {
        return this.#e;
    }
    get commands() {
        return {
            kazagumo: this.#kc,
            shoukaku: this.#sc
        };
    }
}
exports.ForgeLink = ForgeLink;
