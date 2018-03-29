/*---------------------------------------------------------------------------------------------
 *  Copyright (c) QNX Software Systems. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
interface HelloArgs {
    server?: string;
    item: string;
}

interface Window {
    _hello: HelloArgs;
}