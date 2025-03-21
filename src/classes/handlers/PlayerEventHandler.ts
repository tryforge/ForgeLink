import { BaseEventHandler, ForgeClient } from '@tryforge/forgescript'
import { ForgeLink } from '@structures/ForgeLink'


type LavalinkEventNames = 
  | 'trackStart'
  | 'trackEnd'
  | 'trackStuck'
  | 'trackError'
  | 'queueEnd'
  | 'playerCreate'
  | 'playerDestroy'
  | 'playerMove'
  | 'playerDisconnect'
  | 'playerReconnect'
  | 'debug'
  | 'error';

export class LavalinkEventHandler<T extends LavalinkEventNames = LavalinkEventNames> extends BaseEventHandler<any, T> {
    register(client: ForgeClient): void {
        const forgeLink = client.getExtension(ForgeLink, true);
        if (forgeLink.lavalink) {
            forgeLink.lavalink.on(this.name as any, (...args: any[]) => {
                this.listener.apply(client, args);
            });
        } else {
            console.warn(`[ForgeLink] Attempted to register event: "${this.name}" but the lavalink manager is not initialized.`);
        }
    }
}