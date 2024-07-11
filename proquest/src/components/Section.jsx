import { Link } from "react-router-dom"

const Section = ({title, description, bgcolour, btname, to, btncolour,}) =>{
    return(
        <div className={`flex-1 p-6 m-4 ${bgcolour} rounded-lg shadow-md`}>
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="mt-2 mb-4">{description}</p>
            <Link className={`${btncolour}-500 hover:${btncolour}-600 text-white font-bold py-2 px-4 rounded`}
            to={to}> {btname} </Link>
        </div>
    )
}

export default Section