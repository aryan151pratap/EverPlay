import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState } from 'react'
import './App.css'
import Page1 from './components/page1'
import Playing from './components/playing'
import Leftbar from './bar/leftbar';
import { FaUpload } from 'react-icons/fa';
import Music from './components/music';
import Profile from './profileShowing/profile';
import CurrentProfile from './profileShowing/currentProfile';
import TopBar from './bar/topbar';
import Dashboard from './components/dashboard';
import Artist from "./components/artist";

function App() {
  const [close, setClose] = useState(false);
  const [musicBase64, setMusicBase64] = useState({play: false});
  const [songs, setSongs] = useState([]);
  const [user, setUser] = useState(null);
  const [currentTab, setCurrentTab] = useState({icon: <FaUpload/>, name: user?.artist ? 'upload' : 'music'});
  return (
    <Router>
    <div className='relative flex flex-col h-screen bg-black text-white'>
      <div className='z-50 hidden md:flex'>
        <TopBar setUser={setUser} user={user}/>
      </div>
      <div className='h-full w-full flex flex-col md:flex-row overflow-auto'>
        <div className='sticky z-50 inset-0 w-full md:w-fit md:h-full'>
          <Leftbar
          currentTab={currentTab} 
          setCurrentTab={setCurrentTab}
          setUser={setUser}
          user={user}
          />
        </div>
        <div className='h-full w-full p-2 md:p-0 md:py-2 md:mr-2 flex flex-row gap-2 overflow-auto'>
          
          {musicBase64?.name &&
          <div className={`fixed inset-0 top-auto bottom-18 right-2 left-auto sm:relative sm:top-0 sm:bottom-0 sm:right-0 sm:left-0 ${close ? "h-fit" : "h-100"} sm:h-full w-[65%] sm:w-[40%] md:w-[25%] bg-zinc-900 sm:bg-zinc-900/80 rounded-md`}>
            <CurrentProfile 
              addSongs={songs}
              musicBase64={musicBase64}
              setMusicBase64={setMusicBase64}
              close={close}
              setClose={setClose}
            />
          </div>
          }
          
          <div className={`w-full ${musicBase64?.name && "sm:w-[60%] md:w-[75%]"} h-full rounded-md bg-zinc-900/80`}>
            <Routes>
               <Route
                path="/"
                element={currentTab?.name === 'upload' && user?.artist ?
                <Page1
                  user={user}
                  setUser={setUser}
                  musicBase64={musicBase64}
                  setMusicBase64={setMusicBase64}
                  setSongs={setSongs}
                />
                :
                currentTab?.name === 'music' ?
                <div className='w-full h-full'>
                  <Dashboard
                    musicBase64={musicBase64}
                    setMusicBase64={setMusicBase64}
                  />
                </div>
                :
                <div className='w-full h-full bg-black rounded-md'>
                  <Music 
                    user={user}
                    songs={songs}
                    musicBase64={musicBase64}
                    setMusicBase64={setMusicBase64}
                  />
                </div>
              }
              />
              <Route path="/profile/:id" element={<Artist user={user}
                musicBase64={musicBase64}
                setMusicBase64={setMusicBase64}
                setCurrentTab={setCurrentTab}
              />
              }/>
            </Routes>
          </div>
        </div>
      </div>
      
      <div className='sticky inset-0 z-20'>
        {musicBase64 &&
          <div className='h-fit z-20 w-full bg-white shadow-md ml-auto'>
            <Playing
              musicBase64={musicBase64}
              setMusicBase64={setMusicBase64}
            />
          </div>
        }
      </div>

    </div>
    </Router>
  )
}

export default App
