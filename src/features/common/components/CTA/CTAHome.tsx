import Image from "next/image";
const CTAHome = () => {
    return (
        <div className="bg-white md:px-40">
            <div className="md:flex mt-20">
                <Image
                    src={"/assets/images/ctal.webp"}
                    width={643}
                    height={467}
                    alt="CTAL image"
                    className="md:mr-5" />
                <div>
                    <h1 className="text-primary font-bold text-2xl md:text-3xl lg:text-4xl mb-2">Room rental with confident</h1>
                    <ul className="text-2xl [&>li]:md:mt-3 mt-10">
                        <li className="flex gap-2 lg:gap-5 items-center">
                            <span className="inline-flex justify-center items-center w-[24px] h-[24px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] rounded-full bg-primary text-white font-bold">
                                1
                            </span>
                            Verifed property
                        </li>
                        <li className="flex gap-2 lg:gap-5 items-center">
                            <span className="inline-flex justify-center items-center w-[24px] h-[24px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] rounded-full bg-primary text-white font-bold">
                                2
                            </span>
                            Taking care of your payment
                        </li>
                        <li className="flex gap-2 lg:gap-5 items-center">
                            <span className="inline-flex justify-center items-center w-[24px] h-[24px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] rounded-full bg-primary text-white font-bold">
                                3
                            </span>
                            Settlement support
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <div className="md:flex mt-30">
                    <div className="md:mr-5">
                        <h1 className="text-primary font-bold text-2xl md:text-3xl lg:text-4xl mb-2">Settlement services</h1>
                        <ul className="text-2xl [&>li]:md:mt-3">
                            <p className="text-[12px] mt-10 md:text-lg lg:text-2xl text-neutral-700 text-right">
                                Essential services helping smooth
                                <br />
                                transition when you arrived to Canada
                            </p>
                        </ul>
                    </div>
                    <Image
                        src={"/assets/images/ctar.webp"}
                        width={643}
                        height={467}
                        alt="CTAL image" />
                </div>
            </div>
        </div>
    )
}
export default CTAHome;