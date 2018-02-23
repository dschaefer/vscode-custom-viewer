/*---------------------------------------------------------------------------------------------
 *  Copyright (c) QNX Software Systems. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ExtensionContext } from "vscode";
import { HelloServer } from "./server/HelloServer";
import { HelloItemTree } from "./server/HelloItemTree";

export function activate(context: ExtensionContext) {
    const helloServer = new HelloServer(context);
    const helloItemTree = new HelloItemTree(context, helloServer.port);
}
