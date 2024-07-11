import React, { useState } from 'react';
import { FaStar, FaUser,  FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PlayerProfile = ({ profileInfo }) => {
  const {
    _id,
    first,
    last,
    age,
    club,
    overall,
    position,
    specialities,
    star,
  } = profileInfo;

  const [showMoreSpecial, setShowMoreSpecial] = useState(false)

  console.log(profileInfo)
  return (
    <div className="bg-white rounded-lg shadow-md p-4 relative">
      {/* Star Icon */}
      <div className="absolute top-0 right-0 p-2">
        <FaStar className={`text-${star ? "yellow" : "black"}-500 text-lg`} />
      </div>

      {/* Top Section: Profile Picture and Overall Rating */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Profile Picture */}
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center">{/*bg-gray-100 rounded-full h-16 w-16*/}
            <FaUser className="text-8xl text-gray-500" />
          </div>
        </div>
        
        {/* Overall Rating */}
        <div className="flex items-center justify-center">
          <p className="text-3xl font-bold">{overall}</p>
        </div>
      </div>

      {/* Bottom Section: Name, Age, Club, Preferred Positions, Specialty */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left Column: Name, Age, Club */}
        <div>
          <p className="text-lg font-semibold">{`${first} ${last}`}</p>
          <p className="text-sm text-gray-600">{`Age: ${age}`}</p>
          <p className="text-sm text-gray-600">{`Club: ${club}`}</p>
        </div>

        {/* Right Column: Preferred Positions and Specialty */}
        <div>
          <div className="text-sm font-semibold mb-1">Positions</div>
          <div className="flex flex-wrap text-sm text-gray-600 mb-2">
            {position.preferred.slice(0, 3).map((pos, index) => (
              <div key={index} className="mr-2 mb-1">{pos}</div>
            ))}
          </div>

          <div>
            <div className="text-sm font-semibold mb-1 flex items-center">
                Specialty
                {
                    specialities.length > 1 &&
                    <button className='"text-blue-500 hover:text-blue-700 focus:outline-none flex items-center"'
                        onClick={()=>setShowMoreSpecial((prevState)=>!prevState)}>
                        {showMoreSpecial ? <FaChevronUp className="ml-1"/> : <FaChevronDown className="ml-1"/>}
                    </button>
                }
                </div>
          </div>
          <ul className="text-sm text-gray-600">
            <li>{specialities[0]}</li>
            {showMoreSpecial && specialities.slice(1,3).map((extra_speciality, index)=><li key={index}>{extra_speciality}</li>)}
          </ul>
        </div>
        {/* Button for More Details on PLayer */}
        <Link to={`/players/${_id}`} state={profileInfo} className="mt-2 py-1 px-4 bg-blue-500 text-white rounded-md text-sm font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        More Details
      </Link>
      </div>
      
    </div>
  );
};


export default PlayerProfile
