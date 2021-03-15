import { Graph } from "react-d3-graph";

const App = () => {
  // graph payload (with minimalist structure)
  const data = {
    nodes: [
      {id: '0', size: 700},
    ],
    links: [
      { source: "1", target: "2" },
    ],
  };

  var i;

  for(i = 1; i < 20; i++) {
    data['nodes'].push({id: String(i)})
  }

  for(i = 0; i < 6; i++) {
    data['links'].push({ 
      source: String((i + 10) % 20), 
      target: String((3 * i) % 20)
    })
    console.log(String((i + 10) % 20) + ' ' + String((3 * i) % 20));
  }
  for(i = 10; i < 16; i++) {
    data['links'].push({ 
      source: String((i + 4) % 20), 
      target: String((2 * i) % 20)
    })
    console.log(String((i + 4) % 20) + ' ' + String((2 * i) % 20));
  }
  for(i = 7; i < 14; i++) {
    data['links'].push({ 
      source: String(i % 20),
      target: String((4 * i) % 20)
    })
    console.log(String(i % 20) + ' ' + String((4 * i) % 20))
  }
  
  // the graph configuration, just override the ones you need
  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: "lightgreen",
      size: 200,
      highlightStrokeColor: "blue",
    },
    link: {
      ightColor: "lightblue",
    },
  };
  
  const onClickNode = function(nodeId) {
    window.alert(`Clicked node ${nodeId}`);
  };
  
  const onClickLink = function(source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
  };

  return (
    <div>
      <Graph
        id="graph-id" // id is mandatory
        data={data}
        config={myConfig}
        onClickNode={onClickNode}
        onClickLink={onClickLink}
      />;
    </div>
  )
}

export default App;