import { BaseCommandManager } from '@tryforge/forgescript'
import type { KazagumoEvents } from 'kazagumo'

export class KazagumoCommandManager extends BaseCommandManager<keyof KazagumoEvents> {
    handlerName = 'kazagumoCommands'
}