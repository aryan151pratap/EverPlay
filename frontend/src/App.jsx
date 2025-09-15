import { useState } from 'react'
import './App.css'
import Page1 from './components/page1'
import Playing from './components/playing'
import Leftbar from './left/leftbar';
import { FaUpload } from 'react-icons/fa';
import Music from './components/music';
import Profile from './profileShowing/profile';
import CurrentProfile from './profileShowing/currentProfile';

function App() {
  const [close, setClose] = useState(false);
  const [musicBase64, setMusicBase64] = useState({play: false});
  const [songs, setSongs] = useState([]);
  const [currentTab, setCurrentTab] = useState({icon: <FaUpload/>, name:'upload'});
  return (
    <div className='relative flex flex-col h-screen bg-black text-white'>

      <div className='h-full w-full flex flex-col md:flex-row overflow-auto'>
        <div className='sticky inset-0 w-full md:w-fit md:h-full'>
          <Leftbar
          currentTab={currentTab} 
          setCurrentTab={setCurrentTab}
          />
        </div>
        <div className='h-full w-full p-2 md:p-0 md:py-2 md:mr-2 flex flex-row gap-2 overflow-auto'>
          
          <div className={`fixed inset-0 top-auto bottom-2 right-2 left-auto sm:relative sm:top-0 sm:bottom-0 sm:right-0 sm:left-0 ${close ? "h-fit" : "h-100"} z-100 sm:h-full w-[50%] md:w-[40%] bg-zinc-900 sm:bg-zinc-900/80 rounded-md`}>
          
            <CurrentProfile 
              addSongs={songs}
              musicBase64={musicBase64}
              setMusicBase64={setMusicBase64}
              close={close}
              setClose={setClose}
            />
          </div>
          
          <div className='w-full h-full rounded-md bg-zinc-900/80'>
            {currentTab?.name === 'upload' ?
            <Page1
              musicBase64={musicBase64}
              setMusicBase64={setMusicBase64}
              setSongs={setSongs}
            />
            :
            currentTab?.name === 'music' ?
            <Music 
              songs={songs}
              musicBase64={musicBase64}
              setMusicBase64={setMusicBase64}
            />
            :
            <div className='w-full h-full bg-black rounded-md'>

            </div>
            }
          </div>

        </div>
      </div>
      
      <div className='sticky inset-0 z-50'>
        {musicBase64 &&
          <div className='h-fit z-50 w-full bg-white shadow-md ml-auto'>
            <Playing
              musicBase64={musicBase64}
              setMusicBase64={setMusicBase64}
            />
          </div>
        }
      </div>

    </div>
  )
}

export default App
