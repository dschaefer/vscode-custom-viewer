import { window, ViewColumn, Webview, ExtensionContext, Uri } from 'vscode';

export class HelloEditor {
    private webview: Webview;

    constructor(private context: ExtensionContext, private node: string) {
        this.webview = window.createWebview(
            `hello`,
            node,
            ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [ Uri.file(context.extensionPath) ]
            });

        this.webview.html =  `
        <html>
            <body>
                <div id="app"></div>
                <script>console.log('hey');</script>
                <script src="${Uri.file(this.context.asAbsolutePath('out/client/app.js')).with({ scheme: 'vscode-resource' }).toString()}"></script>
            </body>
        </html>
        `;

        this.webview.onDidReceiveMessage(e => {
            switch (e.type) {
                case 'hi':
                    this.webview.postMessage({
                        type: 'hi',
                        msg: `Hi ${this.node}`
                    });
            }
        });
    }
}