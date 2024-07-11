// ViewingButton component in HomePage
import { Link } from "react-router-dom";

const ViewingButton = ({ to, category, list }) => {
    // console.log(category)
    // console.log(list)
    return (
        <section className="m-auto max-w-lg my-10 px-6">
            <Link to={to} state={{ category, list }} className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">
                View {category}
            </Link>
        </section>
    );
}

export default ViewingButton;
