import {
  Route,
  createBrowserRouter as createBrouter,
  createRoutesFromElements as createRFEs,
  RouterProvider as RProvider
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

import HomePage from './pages/HomePage';
import PlayerProfilePage, { playerLoader } from './pages/PlayerProfilePage';
import PlayerProfilesPage from './pages/PlayerProfilesPage';
import AddPlayerPage from './pages/AddPlayerPage';
import NotFound from './pages/404NotFoundPage';
import { playersLoader } from './components/PlayerProfiles';
import UpdatePlayerPage from './pages/UpdatePlayerPage';
import TeamProfilePage, { teamLoader } from './pages/TeamProfilePage';
import TeamProfilesPage from './pages/TeamProfilesPage';
import { teamsLoader } from './components/TeamProfiles';
import PlannerPage from './pages/PlannerPage';
import AddTeamPage from './pages/AddTeamPage';
import JoinNetworkPage from './pages/JoinNetworkPage';

const App = () => {
  const ROUTER = createBrouter(
    createRFEs(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} loader={playersLoader} />
        <Route path='players' element={<PlayerProfilesPage />} loader={playersLoader} />
        <Route path='players/:id' element={<PlayerProfilePage />} loader={playerLoader} />
        <Route path='players/update/:id' element={<UpdatePlayerPage />} loader={playerLoader} />
        <Route path='teams' element={<TeamProfilesPage />} loader={teamsLoader} />
        <Route path='teams/:id' element={<TeamProfilePage />} loader={teamLoader} />
        <Route path='join' element={<JoinNetworkPage />} />
        <Route path='join/player' element={<AddPlayerPage />} />
        <Route path='join/team' element={<AddTeamPage />} />
        <Route path='planner' element={<PlannerPage />} loader={playersLoader} />
        <Route path='*' element={<NotFound />} /> {/* Moved to bottom */}
      </Route>
    ),
    {
      basename: '/proquest', // 🧠 Tells React Router your app is under /proquest
    }
  );

  return <RProvider router={ROUTER} />;
};

export default App;
