import { BaseEventHandler, ForgeClient } from '@tryforge/forgescript'
import { ForgeLink } from '@structures/ForgeLink'

type NodeEventNames = 
  | 'connect'
  | 'disconnect'
  | 'reconnecting'
  | 'create'
  | 'destroy'
  | 'error'
  | 'resumed'
  ;

export class NodeEventHandler<T extends NodeEventNames = NodeEventNames> extends BaseEventHandler<any, T> {
    register(client: ForgeClient): void {
        const forgeLink = client.getExtension(ForgeLink, true);
        if (forgeLink.lavalink) {
            forgeLink.lavalink.nodeManager.on(this.name as any, (...args: any[]) => {
                this.listener.apply(client, args);
            });
        } else {
            console.warn(`[ForgeLink] Attempted to register event "${this.name}" but lavalink manager is not initialized.`);
        }
    }
}