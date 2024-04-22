import NavBar from "../../src/app/components/Navbar/navbar";
import Image from "next/image";
import React from "react";
import SocialMediaLinks from "../../src/app/components/SocialMedia/socialmedia";
import "../../src/app/globals.css";
import StaticImageTechJAF from "../../src/app/components/Static Image Tech JAF/Static Image Tech JAF";


const Sellers = () => {

    return (
<>
    <SocialMediaLinks />
        <div>
            <div className="flex justify-between p-4 bg-gray-500 text-white">
                <div className="flex items-center">
                    <button>
                        <Image src="/logo_.png" alt="logo" width={150} height={150}/>
                    </button>
                </div>
                <NavBar/>
            </div>
            <div>
            < StaticImageTechJAF/>
            </div>



        </div>
    </>
    );
}

export default Sellers;