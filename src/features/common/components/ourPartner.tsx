import Image from "next/image";
const OurPartner = () => {
    return (
        <div className="py-4 md:px-40 md:py-20 lg:py-[80px] flex flex-col gap-4 md:gap-8 lg:gap-10 md:bg-[#EFF9FF] px-3 -mx-3 lg:-mx-0">
            <h1 className="text-center text-primary font-bold text-2xl md:text-3xl lg:text-4xl">Our Partners</h1>
            <p className="text-center text-primary text-xl">Entrusted by partners all around the world</p>
            <div className="md:flex w-1/2 items-center mx-auto justify-evenly">
                <Image
                    src={"/assets/images/partner1.webp"}
                    width={200}
                    height={230}
                    alt="Image partner1"
                />
                <Image
                    src={"/assets/images/partner2.webp"}
                    width={200}
                    height={230}
                    alt="Image partner1"
                />
            </div>
        </div>
    )
}
export default OurPartner;