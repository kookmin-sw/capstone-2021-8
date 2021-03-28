// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/network
import { ResponsiveNetwork } from '@nivo/network';
import CustomNode from '../CustomNode';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const MyResponsiveNetwork = ({ data }) => {

  return (
    <ResponsiveNetwork
      nodes={data['nodes']}
      links={data['links']}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      repulsivity={150}
      iterations={90}
      nodeColor={function(e){return e.color}}
      nodeBorderWidth={1}
      nodeBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.8 ] ] }}
      linkThickness={function(e){return 2*(2-e.source.depth)}}
      motionStiffness={160}
      motionDamping={12}
      linkDistance={'distance'}
      distanceMin={10}
      labelVisibility={true}
      nodeComponent={(t) => CustomNode(t)}
    />
  )
}

export default MyResponsiveNetwork;