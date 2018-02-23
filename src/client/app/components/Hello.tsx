/*---------------------------------------------------------------------------------------------
 *  Copyright (c) QNX Software Systems. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { HelloMsg } from 'common/HelloMsg';

export interface HelloState {
    msg: HelloMsg;
}

export class Hello extends React.Component<{}, HelloState> {
    constructor(props) {
        super(props);

        this.state = {
            msg: { msg: "Loading..." }
        };

        this.hi().then(msg => {
            this.setState({ msg: msg });
        })
    }

    private request(url: string): Promise<any> {
        return fetch(new Request(window._hello.server + url)).then(res => res.json());
    }

    private hi(): Promise<HelloMsg> {
        return this.request(`/hi?item=${window._hello.item}`);
    }

    render() {
        return (
            <div>
                <h2>Custom Viewer</h2>
                <p>{this.state.msg.msg}</p>
            </div>
        );
    }
}