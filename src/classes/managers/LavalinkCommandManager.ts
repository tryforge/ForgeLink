import { BaseCommandManager } from '@tryforge/forgescript'
import type { LavalinkManagerEvents } from 'lavalink-client'


export const handlerName = "ForgeLink"

export class LavalinkManager extends BaseCommandManager<keyof LavalinkManagerEvents> {
    handlerName = 'lavalinkCommands'
}