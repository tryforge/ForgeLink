import { BaseEventHandler, ForgeClient } from "@tryforge/forgescript";
import { LavalinkManagerEvents } from "rawrlink/dist/typings/types/LavalinkManagerEvents";
export type LavalinkEvents = {
    [P in keyof LavalinkManagerEvents]: Parameters<LavalinkManagerEvents[P]>;
};
export declare class LavalinkEventHandler<T extends keyof LavalinkEvents> extends BaseEventHandler<LavalinkEvents, T> {
    register(client: ForgeClient): void;
}
//# sourceMappingURL=LavalinkEventHandler.d.ts.map