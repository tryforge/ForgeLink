import { BaseCommandManager } from '@tryforge/forgescript'
import type { KazagumoEvents } from 'kazagumo'


export const handlerName = "ForgeLink"

export class KazagumoCommandManager extends BaseCommandManager<keyof KazagumoEvents> {
    handlerName = 'kazagumoCommands'
}