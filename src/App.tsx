
import './App.css'
import Explorer from './components/FileExplorer'
import mockTree from './data/mockTree'

function App() {

  return (
    <div className='flex flex-col w-full min-h-screen justify-center items-center'>
      <div className='flex flex-col'>
        <h2 className="font-bold float-left">File Explorer</h2>
        <Explorer workNodes={[mockTree]}/>
      </div>
    </div>
  )
}

export default App
