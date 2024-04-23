import NavBar from "../../src/app/components/Navbar/navbar";
import React from "react";
import "../../src/app/globals.css";
import StaticImageTechJAF from "../../src/app/components/Static Image Tech JAF/Static Image Tech JAF";



function About() {
    return (

<div>
            
            
        <NavBar /> 
        <div style={{ paddingTop: '6rem' }}> {/* Inline style for testing purposes */}
            </div>
            <div>
                <StaticImageTechJAF/>
            </div>
            <div className="w-96 h-96 pb-4 bg-stone-200 flex-col justify-between items-center inline-flex">
                <div className="w-96 flex-col justify-center items-center gap-10 flex">
                    <div className="pr-52 pt-6 justify-start items-center inline-flex">
                        <div className="text-neutral-800 text-3xl font-bold font-['Inter'] leading-10">Let's find a home
                            that's perfect for you
                        </div>
                    </div>
                    <div className="w-96 h-96 flex-col justify-between items-center flex">
                        <div className="self-stretch text-neutral-800 text-base font-normal font-['Inter'] leading-7">I
                            consider myself extremely fortunate to be doing exactly what I want to do in life. In my
                            case this means working with my family and friends, friends of my friends, and other
                            personal referrals to buy and sell real
                        </div>
                        <div
                            className="self-stretch text-neutral-800 text-base font-normal font-['Inter'] leading-7">estate
                            in the greater Sacramento area, as well as in Sutter, Yolo and Yuba Counties. I lived in
                            Marysville
                        </div>
                        <div
                            className="self-stretch text-neutral-800 text-base font-normal font-['Inter'] leading-7">until
                            I graduated from Lindhurst H.S. After H.S., I was off to CSU Sacramento where I obtained a
                            B.S. in
                        </div>
                        <div
                            className="self-stretch text-neutral-800 text-base font-normal font-['Inter'] leading-7">Communication
                            Studies. Coming from an agricultural, migrant background, my parents did not have the
                        </div>
                        <div
                            className="self-stretch text-neutral-800 text-base font-normal font-['Inter'] leading-7">means
                            to pay for my college education so I put myself through school by working in the fields
                            during
                        </div>
                        <div
                            className="self-stretch text-neutral-800 text-base font-normal font-['Inter'] leading-7">summer
                            break and then by working as a student assistant. While in college, I experienced my first
                            major
                        </div>
                        <div
                            className="self-stretch text-neutral-800 text-base font-normal font-['Inter'] leading-7">success
                            in life. I was able to travel abroad and live in Sweden as an international student for one
                            year.
                        </div>
                        <div
                            className="self-stretch text-neutral-800 text-base font-normal font-['Inter'] leading-7">One
                            of the most rewarding experiences! I knew then that anything was possible. I felt very proud
                            to live in
                        </div>
                        <div className="self-stretch text-neutral-800 text-base font-normal font-['Inter'] leading-7">a
                            different culture and to be able to adapt so well. The highlight of my year abroad was
                            traveling to St.
                        </div>
                        <div
                            className="self-stretch text-neutral-800 text-base font-normal font-['Inter'] leading-7">Petersburg,
                            Russia. I enjoy being a Realtor because I love working closely with individuals and learning
                        </div>
                        <div
                            className="self-stretch text-neutral-800 text-base font-normal font-['Inter'] leading-7">about
                            their goals and dreams of home ownership. I am excited to assist individuals in attaining
                            their goal
                        </div>
                        <div className="self-stretch text-neutral-800 text-base font-normal font-['Inter'] leading-7">of
                            homeownership. The most important thing to know is, I am professional and I seek education
                            in order
                        </div>
                        <div className="self-stretch text-neutral-800 text-base font-normal font-['Inter'] leading-7">to
                            stay current on an ever changing Real Estate market. I would of never expect to be given
                            your business
                        </div>
                        <div
                            className="self-stretch text-neutral-800 text-base font-normal font-['Inter'] leading-7">because
                            of our relationship, or how we may know each other. However, if you ever have a residential
                            real
                        </div>
                        <div
                            className="self-stretch text-neutral-800 text-base font-normal font-['Inter'] leading-7">estate
                            need, I would be extremely honored if you would give me an opportunity to work hard for you
                            to
                        </div>
                        <div
                            className="self-stretch text-neutral-800 text-base font-normal font-['Inter'] leading-7">earn
                            your business. Thank you so much for taking the time read a little about me. It is
                            appreciated.
                        </div>
                    </div>
                </div>
            </div>

        
</div>

        
    );
}

export default About;