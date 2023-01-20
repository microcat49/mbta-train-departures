import OuterLayout from './components/outer_layout'

import StopProvider from './data/stop'
import LineProvider from './data/line'
import DirectionProvider from './data/direction'

function App() {
  return (
    <DirectionProvider>
      <LineProvider>
        <StopProvider>
          <OuterLayout />
        </StopProvider>
      </LineProvider>
    </DirectionProvider>
  );
}

export default App;
