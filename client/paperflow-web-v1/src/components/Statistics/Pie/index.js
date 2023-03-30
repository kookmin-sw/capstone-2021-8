import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const Pie = ({ data }) => (
  <ResponsivePie
    data={data}
    margin={{
      top: 40, right: 80, bottom: 80, left: 80,
    }}
    sortByValue
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    colors={{ scheme: 'pastel1' }}
    activeInnerRadiusOffset={2}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={3}
    arcLinkLabelsColor={{ from: 'color' }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
    theme={{
      legends: {
        text: {
          fontSize: 15,
        },
      },
    }}
  />
);

export default Pie;
