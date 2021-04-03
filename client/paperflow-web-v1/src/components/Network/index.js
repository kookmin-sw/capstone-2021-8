import React from 'react';
import { ResponsiveNetwork } from '@nivo/network';
import CustomNode from './CustomNode';
import { networkConfig } from '../../assets/strings/MockUp/Network/config';

const MyResponsiveNetwork = ({ data, handleTooltipInfo }) => (
  <ResponsiveNetwork
    nodes={data.nodes}
    links={data.links}
    margin={{
      top: 0, right: 0, bottom: 0, left: 0,
    }}
    repulsivity={750}
    iterations={networkConfig.iterations}
    nodeColor={(e) => e.color}
    linkThickness={networkConfig.linkThickness}
    motionStiffness={160}
    motionDamping={12}
    linkDistance="distance"
    distanceMin={30}
    nodeComponent={(t) => CustomNode(t, handleTooltipInfo)}
  />
);

export default MyResponsiveNetwork;
