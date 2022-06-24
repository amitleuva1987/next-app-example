import Navbar from "./Navbar"

function layout({children}){
    return(
        <>
        <Navbar />
        <div className="container">
           {children} 
        </div>
        </>
    )
}

export default layout;