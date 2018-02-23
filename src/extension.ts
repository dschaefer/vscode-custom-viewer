import { ExtensionContext } from "vscode";
import { HelloServer } from "./server/HelloServer";
import { HelloItemTree } from "./server/HelloItemTree";

export function activate(context: ExtensionContext) {
    const helloServer = new HelloServer(context);
    const helloItemTree = new HelloItemTree(context, helloServer.port);
}
