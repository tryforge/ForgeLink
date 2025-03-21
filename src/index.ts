import { EventManager, ForgeClient, ForgeExtension, FunctionManager } from "forgescript";
import { NekoLavalinkManager } from "rawrlink"
import { LavalinkOpCodes } from "rawrlink/dist/typings/enums/LavalinkOpCodes";
import { ILavalinkNodeData } from "rawrlink/dist/typings/interfaces/ILavalinkNodeData";
import { VoiceStateUpdateHandle } from "rawrlink/dist/typings/types/VoiceStateUpdateHandle";
import { LavalinkCommandManager } from "./structures/LavalinkCommandManager";

export interface ILavalinkCommand {
    type: LavalinkOpCodes
    code: string
}

export const LavalinkEventStorage = "lavalink"

export interface ILavaForgeOptions {
    clientId: string
    nodes: ILavalinkNodeData[]
    events?: LavalinkOpCodes[]
}

export class LavaForge extends ForgeExtension {
    public static Instance: LavaForge
    
    name: string = "LavaForge"
    description: string = "Very efficient lavalink wrapper for forge"
    version: string = "1.0.0"

    public commands!: LavalinkCommandManager
    public client!: ForgeClient
    public manager!: NekoLavalinkManager

    public constructor(public readonly options: ILavaForgeOptions) {
        super()
    }

    init(client: ForgeClient): void {
        this.commands = new LavalinkCommandManager(client)

        // Load events
        EventManager.load(LavalinkEventStorage, `${__dirname}/events`)
        
        // Load functions
        FunctionManager.load(`${__dirname}/functions`)

        // Convenience
        this.client = client
        this.manager = new NekoLavalinkManager(this.options.clientId, this.voiceUpdateHandler.bind(this), undefined, this.options.nodes)
        
        client.lavalink = this
        LavaForge.Instance = this
        
        // Load events specified in client options
        client.events.load(LavalinkEventStorage, ...(this.options.events ?? []))

        // @ts-ignore
        client.on('raw', d => LavaForge.Instance.manager.updateVoiceData(d))

        // Connect lavalink nodes
        this.manager.connect()
    }

    private voiceUpdateHandler(...[guildId, packet]: Parameters<VoiceStateUpdateHandle>) {
        this.client.guilds.cache.get(guildId)?.shard.send(packet)
    }
}