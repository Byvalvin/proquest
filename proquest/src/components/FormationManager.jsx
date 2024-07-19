import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const FormationManager = ({
  onSaveFormation,
  formations,
  onLoadFormation,
  onClearFormation,
  onDeleteFormation,
}) => {
  const [formationName, setFormationName] = useState("");

  const saveFormation = (event) => {
    event.preventDefault();

    if (!formationName.trim()) {
      alert("Please Enter A Formation Name.");
      return;
    }
    onSaveFormation(formationName);
    setFormationName(""); // Clear the input after saving
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8 w-full max-w-sm md:max-w-md lg:max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Saved Formations</h2>
      <ul className="space-y-2">
        {formations.map((formation) => (
          <li
            key={formation.name}
            className="flex items-center justify-between bg-gray-100 rounded-lg p-2"
          >
            <button
              className="text-blue-600 hover:underline"
              onClick={() => onLoadFormation(formation)}
            >
              {formation.name}
            </button>
            <FaTimes
              className="text-red-500 cursor-pointer"
              onClick={() => onDeleteFormation(formation.name)}
            />
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <input
          type="text"
          className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
          value={formationName}
          onChange={(e) => setFormationName(e.target.value)}
          placeholder="Enter Formation Name"
        />
        <div className="mt-2 flex space-x-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full md:w-auto"
            onClick={saveFormation}
          >
            Save
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md w-full md:w-auto"
            onClick={onClearFormation}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormationManager;
