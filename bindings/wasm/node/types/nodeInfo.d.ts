import type { INodeInfo } from '@iota/types';
/** NodeInfo wrapper which contains the nodeinfo and the url from the node (useful when multiple nodes are used) */
export interface INodeInfoWrapper {
    /** The node info */
    nodeInfo: INodeInfo;
    /** The url of the node */
    url: string;
}
