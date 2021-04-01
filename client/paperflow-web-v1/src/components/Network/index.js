import React from 'react';
import { ResponsiveNetwork } from '@nivo/network';
import CustomNode from './CustomNode';

const MyResponsiveNetwork = ({ data, handleTooltipInfo }) => (
  <ResponsiveNetwork
    nodes={data.nodes}
    links={data.links}
    margin={{
      top: 0, right: 0, bottom: 0, left: 0,
    }}
    repulsivity={150}
    iterations={90}
    nodeColor={(e) => e.color}
    nodeBorderWidth={1}
    nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
    linkThickness={(e) => 2 * (2 - e.source.depth)}
    motionStiffness={160}
    motionDamping={12}
    linkDistance="distance"
    distanceMin={10}
    labelVisibility
    nodeComponent={(t) => CustomNode(t, handleTooltipInfo)}
  />
);

export default MyResponsiveNetwork;
