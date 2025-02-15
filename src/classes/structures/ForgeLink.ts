import { EventManager, ForgeClient, ForgeExtension, FunctionManager } from '@tryforge/forgescript'
import { Connectors, type ShoukakuOptions, type NodeOption, ShoukakuEvents } from 'shoukaku'
import { Kazagumo, type KazagumoEvents, type KazagumoOptions } from 'kazagumo'
import { KazagumoCommandManager } from '@managers/KazagumoCommandManager'
import { ShoukkauCommandManager } from '@managers/ShoukakuCommandManager'
import { join } from 'path'

export interface ForgeLinkSetupOptions {
    /**
     * The events the extension should listen to.
     */
    events?: {
        kazagumo?: (keyof KazagumoEvents)[]
        shoukaku?: (keyof ShoukakuEvents)[]
    }
    /**
     * Kazagumo class options.
     */
    kazagumoOptions: Omit<KazagumoOptions, 'send'>
    /**
     * The lavalink nodes to connect.
     * @example
     * nodes: [{
     *     name: 'COCK MY BELOVED',
     *     auth: 'youshallnotpass',
     *     url: 'lava.botforge.fs:3250',
     *     secure: false
     * }]
     */
    nodes: NodeOption[]
    /**
     * Shoukaku core options.
     */
    shoukakuOptions?: ShoukakuOptions
}

export class ForgeLink extends ForgeExtension {
    name = 'ForgeLink'
    description = '...'
    version = '...'
    #e: Kazagumo | null = null
    #kc: KazagumoCommandManager
    #sc: ShoukkauCommandManager
    constructor(public options: ForgeLinkSetupOptions) {
        super()
    }
    init(client: ForgeClient): void {
        this.#e = new Kazagumo(
            {
                ...this.options.kazagumoOptions,
                send(guildId, payload) {
                    const guild = client.guilds.cache.get(guildId);
                    if (guild) guild.shard.send(payload);
                },
            },
            new Connectors.DiscordJS(client),
            this.options.nodes,
            this.options.shoukakuOptions
        )
        this.#kc = new KazagumoCommandManager(client)
        this.#sc = new ShoukkauCommandManager(client)

        FunctionManager.load('ForgeLink', join(__dirname, '../../natives'))
        EventManager.load('kazagumoCommands', join(__dirname, '../../events/kazagumo'))
        EventManager.load('shoukakuCommands', join(__dirname, '../../events/shoukaku'))

        client.events.load('kazagumoCommands', this.options.events?.kazagumo ?? [])
        client.events.load('shoukakuCommands', this.options.events?.shoukaku ?? [])
    }
    get kazagumo(): Kazagumo {
        return this.#e
    }
    get commands() {
        return {
            kazagumo: this.#kc,
            shoukaku: this.#sc
        }
    }
}