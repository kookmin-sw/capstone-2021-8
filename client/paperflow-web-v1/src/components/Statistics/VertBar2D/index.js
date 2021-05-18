import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const getTspanGroups = (value, maxLineLength, maxLines = 2) => {
  const words = value.split(' ');

  // reduces the words into lines of maxLineLength
  const assembleLines = words.reduce((acc, word) => {
    if ((word + acc.currLine).length > maxLineLength && acc.currLine !== '') {
      return {
        lines: acc.lines.concat([acc.currLine]),
        currLine: word,
      };
    }
    // otherwise add the word to the current line
    return {
      ...acc,
      currLine: `${acc.currLine} ${word}`,
    };
  }, { lines: [], currLine: '' });

  // add the ending state of current line (the last line) to lines
  const allLines = assembleLines.lines.concat([assembleLines.currLine]);

  // for now, only take first 2 lines due to tick spacing and possible overflow
  const lines = allLines.slice(0, maxLines);
  const children = [];
  let dy = 0;

  lines.forEach((lineText, i) => {
    children.push(
      <tspan x={0} dy={dy} key={lineText}>
        {(i === 1 && allLines.length > 2)
          ? `${lineText.slice(0, maxLineLength - 3)}...`
          : lineText}
      </tspan>,
    );
    // increment dy to render next line text below
    dy += 15;
  });

  return children;
};

const VertBar2D = ({ config, data }) => (
  <ResponsiveBar
    data={data}
    keys={config.key}
    indexBy={config.index}
    margin={{
      top: 50, right: 130, bottom: 50, left: 60,
    }}
    padding={0.3}
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    colors={{ scheme: 'pastel1' }}
    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: config.index,
      legendPosition: 'middle',
      legendOffset: 32,
      renderTick: ({
        opacity,
        textAnchor,
        textBaseline,
        textX,
        textY,
        value,
        x,
        y,
      }) => (
        <g
          transform={`translate(${x},${y})`}
          style={{ opacity }}
        >
          <text
            alignmentBaseline={textBaseline}
            textAnchor={textAnchor}
            transform={`translate(${textX},${textY})`}
            fontSize="13px"
          >
            {getTspanGroups(value, 15, 3)}
          </text>
        </g>
      ),
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: config.axis,
      legendPosition: 'middle',
      legendOffset: -40,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
    animate
    motionStiffness={90}
    motionDamping={15}
    legends={[
      {
        dataFrom: 'keys',
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: 'hover',
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

export default VertBar2D;
