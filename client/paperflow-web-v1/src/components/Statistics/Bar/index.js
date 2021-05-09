import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const Bar = ({ data }) => (
  <ResponsiveBar
    data={data}
    keys={['value']}
    indexBy="key"
    margin={{
      top: 50, right: 130, bottom: 50, left: 60,
    }}
    padding={0.3}
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    colors={(d) => d.data.color}
    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'country',
      legendPosition: 'middle',
      legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'food',
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

export default Bar;
