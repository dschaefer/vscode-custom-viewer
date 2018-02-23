/*---------------------------------------------------------------------------------------------
 *  Copyright (c) QNX Software Systems. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { TextDocumentContentProvider, Uri, CancellationToken, ProviderResult, ExtensionContext, workspace } from "vscode";
import * as http from 'http';
import * as express from 'express';
import { HelloMsg } from "../common/HelloMsg";

export class HelloServer implements TextDocumentContentProvider {
    private server: http.Server;
    private _port: number;

    constructor(private context: ExtensionContext) {
        context.subscriptions.push(workspace.registerTextDocumentContentProvider('hello', this));

        const app = express();

        app.get('/hi', async (req, res) => {
            res.json(await this.hi(req.query['item']));
        })
        
        this.server = http.createServer(app);
        this._port = this.server.listen(0).address().port;
    }

    private async hi(item: string): Promise<HelloMsg> {
        return new Promise<HelloMsg>((resolve, reject) => {
            resolve({
                msg: `Hello ${item}!`
            });
        });
    }

    public get port() {
        return this._port;
    }

    provideTextDocumentContent(uri: Uri, cancelToken: CancellationToken): ProviderResult<string> {
        const _hello: HelloArgs = {
            server: `http://localhost:${this.port}`,
            item: uri.authority
        };

        return `
        <html>
            <head>
                <script>
                    window._hello = ${JSON.stringify(_hello)}
                </script>
            </head>
            <body>
                <div id="app"></div>
                <script src="file:///${this.context.asAbsolutePath('out/client/app.js')}"></script>
            </body>
        </html>
        `;
    }
}