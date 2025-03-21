import { BaseCommandManager } from '@tryforge/forgescript'
import type { PlayerEvents } from 'lavalink-client'


export const handlerName = "ForgeLink"

export class LavalinkManager extends BaseCommandManager<keyof PlayerEvents> {
    handlerName = 'lavalinkCommands'
}