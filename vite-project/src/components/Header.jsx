import React from "react";
import { Link } from "react-router-dom";

   

export default function Header(){
    const [activeButton, setActiveButton] = React.useState(null); //why null?.....idk

    const handleButtonClick = buttonName => {
    setActiveButton(buttonName === activeButton ? null : buttonName);
    };

    return(
        <div className="header-container">
            <div className="header-wrap">
                <div className="header-left-wrap">
                    <Link className="UMCMovie" to='/'>
                        UMC Movie
                    </Link>
                </div>
                <div className="header-right-wrap">
                    <ul>
                        <li>
                            <Link className="header-nav-signup" to='/signuppage'>
                                회원가입
                            </Link>
                            
                        </li>
                        <li>
                            <Link className="header-nav-item" to='/popularpage'>
                                Popular
                            </Link>
                        </li>
                        <li>
                            <Link className="header-nav-item" to='/nowplayingpage'>
                                Now Playing
                            </Link>
                        </li>
                        <li>
                            <Link className="header-nav-item" to='/topratedpage'>
                                Top Rated
                            </Link>
                        </li>
                        <li>
                            <Link className="header-nav-item" to='/upcoming'>
                                Upcoming
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )

    
}