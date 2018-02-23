import { TreeDataProvider, ExtensionContext, window, TreeItem, TreeItemCollapsibleState, commands, Uri, ViewColumn, EventEmitter, Event } from "vscode";

export class HelloItemTree implements TreeDataProvider<string> {
	private _onDidChangeTreeData: EventEmitter<string | undefined> = new EventEmitter<string | undefined>();
	readonly onDidChangeTreeData: Event<string | undefined> = this._onDidChangeTreeData.event;

    private items: string[] = [];

    constructor(private context: ExtensionContext, private port: number) {
        context.subscriptions.push(window.registerTreeDataProvider('helloItems', this));

        context.subscriptions.push(commands.registerCommand('hello.add', () => this.add()));
        context.subscriptions.push(commands.registerCommand('hello.delete', node => this.delete(node)));
        context.subscriptions.push(commands.registerCommand('hello.open', node => this.open(node)));
    }

    getTreeItem(element: string): TreeItem {
        return {
            label: element,
            collapsibleState: TreeItemCollapsibleState.None,
            contextValue: 'helloItem',
            command: {
                command: 'hello.open',
                arguments: [ element ],
                title: 'Open'
            }
        }
    }

    getChildren(element?: string): Thenable<string[]> {
        return new Promise((resolve, reject) => {
            resolve(this.items);
        });
    }

    public add() {
        window.showInputBox({
            prompt: "New Hello Item",
        }).then(item => {
            this.items.push(item);
            this._onDidChangeTreeData.fire();
        })
    }

    public delete(node: string) {
        this.items = this.items.filter(item => item !== node);
        this._onDidChangeTreeData.fire();
    }

    public open(node: string) {
        commands.executeCommand(
            'vscode.previewHtml',
            Uri.parse(`hello://${node}`),
            ViewColumn.One,
            node
        );
    }
}