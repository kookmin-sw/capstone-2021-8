import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const HorizBar1D = ({ config, data }) => (
  <ResponsiveBar
    data={data}
    keys={[config.key]}
    indexBy={config.index}
    margin={{
      top: 50, right: 130, bottom: 50, left: 60,
    }}
    padding={0.3}
    layout="horizontal"
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    colors={(d) => d.data.color}
    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
    axisTop={null}
    axisRight={null}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: config.index,
      legendPosition: 'middle',
      legendOffset: -40,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
    animate
    motionStiffness={90}
    motionDamping={15}
  />
);

export default HorizBar1D;
