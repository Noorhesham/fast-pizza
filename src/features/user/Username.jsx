import { useSelector } from "react-redux"

function Username() {
    const name=useSelector(state=>state.user.userName)
    if (!name) return null;
    return (
        <div className="text-xl font-semibold hidden md:block">
            {name}
        </div>
    )
}

export default Username
