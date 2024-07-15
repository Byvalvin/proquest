import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // to redirect to other page after submit
import { toast } from "react-toastify";
import natData from '../nat.json';

const AddPlayerPage = () => {
  
  const navigate = useNavigate();

  const initialPlayerState = {
    first: "",
    last: "",
    DOB: { year: "", month: "", day: "" },
    age: "",
    nationality: "",
    team: "",
    estValue: 1,
    footedness: "",
    mainPosition: "",
    preferredPositions: "",
    otherPositions: "",
    specialities: "",
    weaknesses: "",
    description: "",
    review:"",
    views: 0,
    overall: 50.0,
    gender: "",
    star: false
  };
      
  const [first, setFirst] = useState(initialPlayerState.first);
  const [last, setLast] = useState(initialPlayerState.last);
  const [DOB, setDOB] = useState(initialPlayerState.DOB);
  const [age, setAge] = useState(initialPlayerState.age);
  const [nationality, setNationality] = useState(initialPlayerState.nationality);
  const [team, setTeam] = useState(initialPlayerState.team);
  const [estValue, setEstValue] = useState(initialPlayerState.estValue); 
  const [footedness, setFootedness] = useState(initialPlayerState.footedness);
  const [mainPosition, setMainPosition] = useState(initialPlayerState.mainPosition);
  const [preferredPositions, setPreferredPositions] = useState(initialPlayerState.preferredPositions);
  const [otherPositions, setOtherPositions] = useState(initialPlayerState.otherPositions);
  const [specialities, setSpecialities] = useState(initialPlayerState.specialities);
  const [weaknesses, setWeaknesses] = useState(initialPlayerState.weaknesses);
  const [description, setDescription] = useState(initialPlayerState.description);
  const [review, setReview] = useState(initialPlayerState.review);
  const [views, setViews] = useState(initialPlayerState.views); 
  const [overall, setOverall] = useState(initialPlayerState.overall); 
  const [gender, setGender]= useState(initialPlayerState.gender);
  const [star, setStar] = useState(initialPlayerState.star);

  const [validNationalities, setValidNationalities] = useState([]);
  const [validTeams, setValidTeams] = useState([]);

  // Validation state
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamNames = await getTeamNames();
        const nationalities = getNationalities();
        setValidNationalities(nationalities);
        setValidTeams(teamNames);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getNationalities = () => {
    try {
      const nationalities = natData.nationalities;
      return nationalities.map((nat) => nat.abbr);
    } catch (error) {
      console.error("Error fetching nationalities:", error);
      return [];
    }
  };

  const getTeamNames = async () => {
    try {
      const teamsURL = "https://proquest-pspc.onrender.com/api/teams";
      const response = await axios.get(teamsURL);
      return response.data.data.map((team) => team.name);
    } catch (error) {
      console.error("Error fetching teams:", error);
      return [];
    }
  };

  const addPlayer = async (player) => {
    try {
      const response = await axios.post("https://proquest-pspc.onrender.com/api/players", player);
      console.log(response.data);
      resetForm();
    } catch (error) {
      console.error("Error adding player:", error);
    }
  };

  const resetForm = () => {
    setFirst(initialPlayerState.first);
    setLast(initialPlayerState.last);
    setDOB(initialPlayerState.DOB);
    setAge(initialPlayerState.age);
    setNationality(initialPlayerState.nationality);
    setTeam(initialPlayerState.team);
    setEstValue(initialPlayerState.estValue);
    setFootedness(initialPlayerState.footedness);
    setMainPosition(initialPlayerState.mainPosition);
    setPreferredPositions(initialPlayerState.preferredPositions);
    setOtherPositions(initialPlayerState.otherPositions);
    setSpecialities(initialPlayerState.specialities);
    setWeaknesses(initialPlayerState.weaknesses);
    setDescription(initialPlayerState.description);
    setReview(initialPlayerState.review);
    setViews(initialPlayerState.views);
    setOverall(initialPlayerState.overall);
    setGender(initialPlayerState.gender);
    setStar(initialPlayerState.star);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {};
    if (!footedness.trim()) validationErrors.footedness = "Footedness is required";
    if (!first.trim()) validationErrors.first = "First Name is required";
    if (!last.trim()) validationErrors.last = "Last Name is required";
    if (!(age.toString()).trim()) validationErrors.age = "Age is required";
    if (!mainPosition.trim()) validationErrors.mainPosition = "Main Position is required";
    if (!nationality.trim()) validationErrors.nationality = "Nationality is required";
    if (!(overall.toString()).trim()) validationErrors.overall = "Overall is required";

    if (Object.keys(validationErrors).length) {
      setValidationErrors(validationErrors);
      return;
    }

    const allPreferredPositions = [mainPosition.trim(), ...preferredPositions.split(",").map((pos) => pos.trim())].filter(Boolean);
    const allOtherPositions = otherPositions.trim() !== "" ? otherPositions.split(",").map((pos) => pos.trim()) : [];

    const newPlayer = {
      first,
      last,
      DOB,
      age,
      nationality,
      team,
      estValue,
      footedness: footedness.toLowerCase() === "right" ? 1 : 0,
      position: {
        preferred: allPreferredPositions,
        other: allOtherPositions,
      },
      specialities: specialities.trim() !== "" ? specialities.split(",").map((spec) => spec.trim()) : [],
      weaknesses: weaknesses.trim() !== "" ? weaknesses.split(",").map((spec) => spec.trim()) : [],
      description,
      review,
      views,
      overall,
      gender: gender.toLowerCase() === "male" ? 1 : 0,
      star,
    };
    console.log("Form submitted with data:", newPlayer);

    try {
      await addPlayer(newPlayer);
      toast.success('Player added successfully.');
    } catch (error) {
      console.log("Error adding player on submit", error);
      toast.error('Player could not be added.');
    } finally {
      setValidationErrors({});
      navigate('/players');
    }
  };

  return (
    <section className="p-6 md:p-8 lg:p-12">
      <div className="container mx-auto">
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Add Player</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="first" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                id="first"
                value={first}
                onChange={(e) => setFirst(e.target.value)}
                className={`border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full ${validationErrors.first ? "border-red-500" : ""}`}
              />
              {validationErrors.first && <p className="text-red-500 text-sm mt-1">{validationErrors.first}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="last" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                id="last"
                value={last}
                onChange={(e) => setLast(e.target.value)}
                className={`border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full ${validationErrors.last ? "border-red-500" : ""}`}
              />
              {validationErrors.last && <p className="text-red-500 text-sm mt-1">{validationErrors.last}</p>}
            </div>
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Year"
                value={DOB.year}
                onChange={(e) => setDOB({ ...DOB, year: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full"
              />
              <input
                type="text"
                placeholder="Month"
                value={DOB.month}
                onChange={(e) => setDOB({ ...DOB, month: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full"
              />
              <input
                type="text"
                placeholder="Day"
                value={DOB.day}
                onChange={(e) => setDOB({ ...DOB, day: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className={`border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full ${validationErrors.age ? "border-red-500" : ""}`}
              />
              {validationErrors.age && <p className="text-red-500 text-sm mt-1">{validationErrors.age}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">Nationality</label>
              <select
                id="nationality"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className={`border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full ${validationErrors.nationality ? "border-red-500" : ""}`}
              >
                <option value="">Select Nationality</option>
                {validNationalities.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {validationErrors.nationality && <p className="text-red-500 text-sm mt-1">{validationErrors.nationality}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="team" className="block text-sm font-medium text-gray-700">Team</label>
              <select
                id="team"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full"
              >
                <option value="">Select Team</option>
                {validTeams.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="estValue" className="block text-sm font-medium text-gray-700">Estimated Value</label>
              <input
                type="number"
                id="estValue"
                value={estValue}
                onChange={(e) => setEstValue(e.target.value)}
                disabled
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="footedness" className="block text-sm font-medium text-gray-700">Footedness</label>
              <select
                id="footedness"
                value={footedness}
                onChange={(e) => setFootedness(e.target.value)}
                className={`border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full ${validationErrors.footedness ? "border-red-500" : ""}`}
              >
                <option value="">Select Footedness</option>
                <option value="Right">Right</option>
                <option value="Left">Left</option>
              </select>
              {validationErrors.footedness && <p className="text-red-500 text-sm mt-1">{validationErrors.footedness}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="mainPosition" className="block text-sm font-medium text-gray-700">Main Position</label>
              <input
                type="text"
                id="mainPosition"
                value={mainPosition}
                onChange={(e) => setMainPosition(e.target.value)}
                placeholder="e.g., LW"
                className={`border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full ${validationErrors.mainPosition ? "border-red-500" : ""}`}
              />
              {validationErrors.mainPosition && <p className="text-red-500 text-sm mt-1">{validationErrors.mainPosition}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="preferredPositions" className="block text-sm font-medium text-gray-700">Preferred Positions (comma-separated)</label>
              <input
                type="text"
                id="preferredPositions"
                value={preferredPositions}
                onChange={(e) => setPreferredPositions(e.target.value)}
                placeholder="e.g., CM, ST"
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="otherPositions" className="block text-sm font-medium text-gray-700">Other Positions (comma-separated)</label>
              <input
                type="text"
                id="otherPositions"
                value={otherPositions}
                onChange={(e) => setOtherPositions(e.target.value)}
                placeholder="e.g., GK, CB"
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="specialities" className="block text-sm font-medium text-gray-700">Specialities (comma-separated)</label>
              <input
                type="text"
                id="specialities"
                value={specialities}
                onChange={(e) => setSpecialities(e.target.value)}
                placeholder="e.g., Dead-Ball Specialist, Speed"
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="weaknesses" className="block text-sm font-medium text-gray-700">Weaknesses (comma-separated)</label>
              <input
                type="text"
                id="weaknesses"
                value={weaknesses}
                onChange={(e) => setWeaknesses(e.target.value)}
                placeholder="e.g., Mentality, Stamina"
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="review" className="block text-sm font-medium text-gray-700">Review</label>
              <textarea
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="views" className="block text-sm font-medium text-gray-700">Views</label>
              <input
                type="number"
                id="views"
                value={views}
                onChange={(e) => setViews(e.target.value)}
                disabled
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="overall" className="block text-sm font-medium text-gray-700">Overall Rating</label>
              <input
                type="number"
                id="overall"
                value={overall}
                onChange={(e) => setOverall(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full"
              />
            </div>
            <div className="mb-4">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="star" className="block text-sm font-medium text-gray-700">Star</label>
              <input
                type="checkbox"
                id="star"
                checked={star}
                onChange={(e) => setStar(e.target.checked)}
                disabled
                className="ml-2 cursor-not-allowed"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddPlayerPage;
