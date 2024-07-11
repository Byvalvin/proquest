
const TITLE = "Get In The Game"
const DESCRIPTION = "Find talent that fits your team."

const Hero = ({title=TITLE, description=DESCRIPTION}) =>{
    return(
        <div className="bg-blue-500 py-20 px-4 text-center">
            <h1 className="text-5xl font-bold text-white mb-4">{title}</h1>
            <p className="text-lg text-white">{description}</p>
        </div>
    )
}


export default Hero