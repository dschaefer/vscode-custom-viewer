/*---------------------------------------------------------------------------------------------
 *  Copyright (c) QNX Software Systems. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';

export interface HelloState {
    msg: string;
}

export class Hello extends React.Component<{}, HelloState> {
    constructor(props) {
        super(props);

        this.state = {
            msg: "Loading..."
        };

        window.parent.postMessage({
            type: 'hi'
        }, '*');

        window.addEventListener('message', e => {
            switch(e.data.type) {
                case 'hi':
                    this.setState({msg: e.data.msg});
            }
        });
    }

    render() {
        return (
            <div>
                <h2>Custom Viewer</h2>
                <p>{this.state.msg}</p>
            </div>
        );
    }
}