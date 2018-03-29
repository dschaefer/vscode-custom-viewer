import { window, ViewColumn, Webview, ExtensionContext } from 'vscode';
export class HelloEditor {
    private webview: Webview;

    constructor(private context: ExtensionContext, private node: string) {
        const _hello : HelloArgs = {
            item: node
        };

        this.webview = window.createWebview(`hello://${node}/`, node, ViewColumn.One, {});
        this.webview.html =  `
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

        this.webview.onDidReceiveMessage(e => {
            switch (e.type) {
                case 'hi':
                    this.webview.postMessage({
                        type: 'hi',
                        msg: `Hi ${e.node}`
                    });
            }
        });
    }
}