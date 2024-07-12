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



const App = () =>{
  // const pps = [
  //   {
  //     id:1,
  //     first:"D",
  //     last:"A",
  //     DOB:{year:2001, month:"Jan", day:11},
  //     age:23,
  //     nationality:"NIG",

  //     location:"CAN",
  //     team:"Star United F.C.",
  //     est_value:1000,

  //     footedness:1,
  //     position:{preferred:["CAM", "CF", "CM","RW","LW"],
  //       other:["CDM", "RM","LM","LB","RB"]},
  //     specialities:["dribbler","long shots","finesse", "vision", "weak foot"],
  //     weaknesses:["mentality","decision making","fear","stamina","finishing","shot power","ferocity"],
      
  //     description:"A fine player. Much too work on",
  //     views:7,
  //     overall:90.1,
  //     star:false,
  //   },

  //   {
  //     id:2,
  //     first:"Tio",
  //     last:"Akin",
  //     DOB:{year:2003, month:"Jun", day:23},
  //     age:21,
  //     nationality:"NIG",

  //     location:"CAN",
  //     team:"Star United F.C.",
  //     est_value:600,

  //     footedness:1,
  //     position:{preferred:["ST", "CF", "RW","LW"],
  //       other:["CDM", "CB","LB","RB"]},
  //     specialities:["leader of men","dribblier","versatile","speed","strength"],
  //     weaknesses:["stamina","finishing","ball control"],
      
  //     description:"A solid player.",
  //     views:9,
  //     overall:84.7,
  //     star:false,
  //   },
  //   {
  //     id:3,
  //     first:"Brayden",
  //     last:"A",
  //     DOB:{year:2003, month:"Jul", day:13},
  //     age:21,
  //     nationality:"CAN",

  //     location:"CAN",
  //     team:"Star United F.C.",
  //     est_value:1100,

  //     footedness:1,
  //     position:{preferred:["ST", "LW", "CF", "RW", "CAM"],
  //       other:["LM", "RM", "CM"]},
  //     specialities:["goal scorer", "shot power", "finishing","speed", "ferocity"],
  //     weaknesses:["work rate","injury prone", "stamina"],
      
  //     description:"Attacker, through and through",
  //     views:17,
  //     overall:92.1,
  //     star:true,
  //   },

  //   {
  //     id:4,
  //     first:"Elias",
  //     last:"M",
  //     DOB:{year:2001, month:"Apr", day:11},
  //     age:23,
  //     nationality:"CON",

  //     location:"CAN",
  //     team:"Star United F.C.",
  //     est_value:950,

  //     footedness:1,
  //     position:{preferred:["CM", "CDM", "RM","LM"],
  //       other:["CB","LB","RB"]},
  //     specialities:["controller","ball control","dribbler","passing","speed","strength"],
  //     weaknesses:["vision"],
      
  //     description:"A game changer.",
  //     views:11,
  //     overall:89.3,
  //     star:false,
  //   },
    
  // ]
  const ROUTER = createBrouter(
    createRFEs(
      <Route path='/' element={<MainLayout/>}>
        <Route path='*' element={<NotFound></NotFound>}/> 
        <Route index element={<HomePage ></HomePage>} loader={playersLoader}/>
        <Route path='/players' element={<PlayerProfilesPage ></PlayerProfilesPage>} loader={playersLoader}/>
        <Route path='/players/:id' element={<PlayerProfilePage></PlayerProfilePage>} loader={playerLoader}/>
        <Route path='/teams' element={<TeamProfilesPage ></TeamProfilesPage>} loader={teamsLoader}/>
        <Route path='/join' element={<AddPlayerPage></AddPlayerPage>}/>
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