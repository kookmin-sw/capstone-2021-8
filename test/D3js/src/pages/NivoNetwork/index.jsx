import Network from './component/Network';
import networkMockUp from '../../data/networkMockUp4.json'

const App = () => {
  let style = {
    width: '1000px',
    height: '1000px',
  }

  return (
    <div style={style}>
      <Network data={networkMockUp}/>
    </div>
  )
}

export default App;