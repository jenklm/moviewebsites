import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import PopularPage from "./pages/Popular";
import NowPlayingPage from "./pages/NowPlayingPage";
import TopRatedPage from "./pages/TopRatedPage";
import UpComing from "./pages/UpComing";
import NotFound from "./pages/NotFound";
import MovieDetailPage from "./pages/MovieDetailPage";
import SignUpPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

import './index.css';

function App(){
    return(
        <div className="root-wrap">
            <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/signuppage" element={<SignUpPage />} />
                    <Route path="/loginpage" element={<LoginPage/>}/> 
                    <Route path="/popularpage" element={<PopularPage />} />
                    <Route path="/nowplayingpage" element={<NowPlayingPage />} />
                    <Route path="/topratedpage" element={<TopRatedPage />} />
                    <Route path="/upcoming" element={<UpComing />} />
                    <Route path="/:movieName" element={<MovieDetailPage/>}/> {/* id라는 params를 추가한 라우트 추가*/}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            <Footer />    
        </BrowserRouter>
        </div>
        
    );
}

export default App;