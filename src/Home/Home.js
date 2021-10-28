import React from "react";
import "./home.css";


 const Home = ()=> {

    return(
        <div className="div-home">
    <div className="pure-g-r">
        <div className="pure-u-1">
            <h1>The Bank </h1>
        </div>
    </div>
    <div className="pure-g-r">
        <div className="pure-u-1-2">
            <div className="brand">
                <div className="content pure-u-1 ">
                    <div className="img-1">
                        <img src="https://wallpaperbat.com/down/359285-open-banking-psd2-gt-software-gt-software" />
                    </div>
                </div>
            </div>
        </div>

        <div className="pure-u-1-2">
            <div className="brand">
                <h3>About The Bank</h3>
                <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam eligendi quibusdam, dolorum maxime cum numquam quisquam, deleniti eum incidunt, velit non consectetur. Facere, ipsa maxime, ullam id amet odio laboriosam sit iusto tempore fugit exercitationem, a dolore quo maiores nisi
                </p>
            </div>
        </div>
    </div>
    <div className="pure-g-r">
        <div className="pure-u-1-2">
            <div className="brand">
                <h3>Your Bank</h3>
                <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam eligendi quibusdam, dolorum maxime cum numquam quisquam, deleniti eum incidunt, velit non consectetur. Facere, ipsa maxime, ullam id amet odio laboriosam sit iusto tempore fugit exercitationem, a dolore quo maiores nisi
                </p>
            </div>
        </div>
        <div className="pure-u-1-2">
            <div className="brand">
                <div className="content pure-u-1 ">
                    <div className="img-2">
                        <img src="https://wallpaperbat.com/down/441775-dividend-stocks-the-analysts-love-the-most" />
                    </div>
                </div>
            </div>
        </div>
    </div> 
    <footer id="main-footer">
    <p>The Bank &copy; 2021, All RIghts Reserved</p>
  </footer>
        </div>
    )
}

export default Home ;