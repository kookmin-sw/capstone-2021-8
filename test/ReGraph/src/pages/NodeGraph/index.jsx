import { Graph } from "react-d3-graph";

const App = () => {
  // graph payload (with minimalist structure)
  const data = {
    nodes: [
      {
        id: 'company', 
        size: 700,
      },
    ],
    links: [],
  };

  var i, j;
  for(i = 1; i < 6; i++) {
    data['nodes'].push({
      id: 'region ' + String(i),
      size: 300
    });
    data['links'].push({
      source: 'company', 
      target: 'region ' + String(i),=
    })
    for(j = 1; j < 6; j++) {
      data['nodes'].push({
        id: 'office ' + String(i) + ' ' + String(j),
        size: 100
      })
      data['links'].push({
        source: 'region ' + String(i),
        target: 'office ' + String(i) + ' ' + String(j),
      })
    }
  }

  for(i = 1; i < 6; i++) {
    for(j = 1; j < 6; j++) {
      if(i !== j) {
        data['links'].push({
          source: 'region ' + String(i), 
          target: 'region ' + String(j),
        })
      }
    }
  }

  /*
  for(i = 1; i < 6; i++) {
    for(j = 1; j < 6; j++) {
      if(i !== j) {
        data['links'].push({
          source: 'office ' + String(i) + ' ' + String(j), 
          target: 'office ' + String(j) + ' ' + String(i),
        })
      }
    }
  }
  */

  // the graph configuration, just override the ones you need
  const myConfig = {
    d3: {
      'linkLength': 70,
    },
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