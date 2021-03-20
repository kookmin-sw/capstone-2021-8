// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/circle-packing
import { ResponsiveBubble } from '@nivo/circle-packing'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const CustomBubbleNode = ({ node, style, handlers, theme }) => {
  if (style.r <= 0) return null;
  
  return (
    <g transform={`translate(${style.x},${style.y})`}>
      <circle
        r={style.r}
        {...handlers}
        fill={style.fill ? style.fill : style.color}
        stroke={style.borderColor}
        strokeWidth={style.borderWidth}
      />
      {(node.data['name'] !== false && !node.children) && (
      <text
      textAnchor="middle"
      dominantBaseline="central"
      style={{
        ...theme.labels.text,
        fontSize: `${Math.round(
        (style.r / 3) * (10 / node.data['name'].toString().substring(0, style.r / 3).length) + 1,
        )}px`,
        fill: style.labelTextColor,
        pointerEvents: 'none',
      }}
      >
        {node.data['name']}
      </text>
      )}
    </g>
  );
};

  

const MyResponsiveBubble = ({ root /* see root tab */ }) => (
    <ResponsiveBubble
        root={root}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        identity="name"
        value="loc"
        colors={{ scheme: 'nivo' }}
        padding={6}
        labelSkipRadius={30}
        labelTextColor="#ffffff"
        borderWidth={2}
        defs={[
            {
                id: 'lines',
                type: 'patternLines',
                background: 'none',
                color: 'inherit',
                rotation: -45,
                lineWidth: 5,
                spacing: 8
            }
        ]}
        fill={[ { match: { depth: 1 }, id: 'lines' } ]}
        animate={true}
        motionStiffness={90}
        motionDamping={12}
        nodeComponent = {CustomBubbleNode}
    />
)

export default MyResponsiveBubble;