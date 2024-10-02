import NavBar from "../../components/Navbar/navbar";
import React from "react";
import "../globals.css";
import Link from 'next/link';


//header component 

const Header = () => {
    return (
        <header className="flex items-center justify-between p-5">
            <div className="flex items-center">
                <img src="/logo_.png" alt="Lourdes Mendoza" className="h-20" />
                <div className="ml-3">
                    <h1 className="text-lg font-bold font-serif text-gray-800">Real Estate Services</h1>
                    <p className="text-sm text-gray-500">Turning your dreams into an address</p>
                </div>
            </div>
        </header>
    );
};


//profile card component 
interface ProfileCardProps {
    name: string;
    role: string;
    nmlsNumber: string;
    branch: string;
    phone: string;
    email: string;
    language: string;
    location: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
    name,
    role,
    nmlsNumber,
    branch,
    phone,
    email,
    language,
    location,
}) => {
    return (
        <div className="flex items-start justify-between p-8 bg-blue shadow-md rounded-md">
            {/* profile image */}
            <div className="w-1/4">
            <img
            src="/lourdes.jpg"
            alt={'${name}'}
            className="w-full h-auto object-cover rounded-lg"
            />
        </div>

        {/*Info*/}
        {/*<div className="w 2/3 pl-8">*/}
        <div className="flex felx-col p-8 bg-white shadow-md rounded-md">
            <h2 className="text-4xl font-bold font-serif text-blue-600 leading-tight">{name}</h2>
            <p className="text-lg font-medium text-gray-500 mt-0">{role} | DRE#01527343</p>

            {/*Divider Line*/}
            <div className="border-t border-gray-300 my-4"></div>
            {/*Information section*/}
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-gray-700">
                <div>
                    <p className="font-semibold text-lg text-black">Branch:</p>
                    <p className="text-md text-black">{branch}</p>
                </div>

                <div>
                    <p className="font-semibold text-lg text-black">Phone:</p>
                    <p className="text-md text-black">{phone}</p>
                </div>

                <div>
                    <p className="font-semibold text-lg text-black">Language:</p>
                    <p className="text-md text-black">{language}</p>
                </div>

                <div>
                    <p className="font-semibold text-lg text-black">Email:</p>
                    <p className="text-md text-black">{email}</p>
                </div>

                <div>
                    <p className="font-semibold text-lg text-black">Location:</p>
                    <p className="text-md text-black">{location}</p>
                </div>
            </div>

           </div>
        </div>
    );
};

//call to action button

const CTAButton =() => {
    return (
        <div className="mt=4">
            <Link href = "/homeloaner">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full">
                Apply Now
            </button>
            </Link>
        </div>
    );
};

const LandingPage = () => {
    return (


    <div 
        style={{ backgroundImage:"url(/sacramento.jpg)", backgroundSize: 'cover', minHeight: '100vh'}}>
            

            <div className="p-15 bg-white bg-opacity-50 rounded-lg">

            <Header />
            <div className="flex justify-center mt-12">

            <div className="flex justify-center font-serif text-base mt-10 ">
                <ProfileCard 
                    name="Lourdes Mendoza"
                    role="Realtor"
                    nmlsNumber="01527343"
                    branch="Sacramento"
                    phone="916.516.0007"
                    email="lourdesmendoza1@yahoo.com"
                    language="english and spanish"
                    location="california"
                    />
                </div>
                <div className="flex justify-center mt-20">
                    <CTAButton />
                </div>
            </div>
        </div>
    </div>
    );
};

export default LandingPage;