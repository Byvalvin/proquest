import {Route,
  createBrowserRouter as createBrouter,
  createRoutesFromElements as createRFEs,
  RouterProvider as RProvider} from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
// to allow page routing use react rouuter dom imports, create  a router
// that will be pass as an arg into a router provider that is return by the main app
// the router takes the create routes from elements arg so we can pass in a Main layout.
// This Main layout contains components that will be on all pages
// We can wrap all the pages we want to route to in the Main Layout
// Any pages wrapped in MainLayout will use the Main Layout
// For each new page, make the page, add the route under the mainlayout


import HomePage from './pages/HomePage'
import PlayerProfilePage, { playerLoader } from './pages/PlayerProfilePage'
import PlayerProfilesPage from './pages/PlayerProfilesPage'
import AddPlayerPage from './pages/AddPlayerPage'
import NotFound from './pages/404NotFoundPage'
import { playersLoader } from './components/PlayerProfiles'
import UpdatePlayerPage from './pages/UpdatePlayerPage'
import TeamProfilePage, {teamLoader} from './pages/TeamProfilePage'
import TeamProfilesPage from './pages/TeamProfilesPage'
import { teamsLoader } from './components/TeamProfiles'
import PlannerPage from './pages/PlannerPage'
import AddTeamPage from './pages/AddTeamPage'
import JoinNetworkPage from './pages/JoinNetworkPage'



const App = () =>{
 
  const ROUTER = createBrouter(
    createRFEs(
      <Route path='/' element={<MainLayout/>}>
        <Route path='*' element={<NotFound></NotFound>}/> 
        <Route index element={<HomePage ></HomePage>} loader={playersLoader}/>
        <Route path='/players' element={<PlayerProfilesPage ></PlayerProfilesPage>} loader={playersLoader}/>
        <Route path='/players/:id' element={<PlayerProfilePage></PlayerProfilePage>} loader={playerLoader}/>
        <Route path='/teams' element={<TeamProfilesPage ></TeamProfilesPage>} loader={teamsLoader}/>
        <Route path='/join' element={<JoinNetworkPage></JoinNetworkPage>}/>
        <Route path='/join/player' element={<AddPlayerPage></AddPlayerPage>}/>
        <Route path='/join/team' element={<AddTeamPage></AddTeamPage>}/>
        <Route path='players/update/:id' element={<UpdatePlayerPage></UpdatePlayerPage>} loader={playerLoader}/>
        <Route path='/teams/:id' element={<TeamProfilePage></TeamProfilePage>} loader={teamLoader}/>
        <Route path='/planner'element={<PlannerPage></PlannerPage>} loader={playersLoader}/>
      </Route>
    )
  )
  
  return(
    <RProvider router={ROUTER}/>
  )
}

export default App