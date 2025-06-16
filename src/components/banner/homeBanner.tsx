import SearchBox from "../searchBox/searchBox"

const HomeBanner = () => {
    return (
        <div className="pt-[76px] md:pt-0 md:h-[520px] lg:h-[590px] duration-200 ease-in-out transition-all w-[calc(100% + 24px)] lg:w-full md:bg-[url('/assets/images/home-banner.png')] bg-cover bg-right-top -mx-3 lg:-mx-0 relative inset-0 z-[8]">
            <div className="absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 flex flex-col gap-10 md:max-w-[624px] w-full px-3 md:px-8 lg:px-4 box-sizing ">
                <h1 className="text-white hidden md:block font-bold heading-3 lg:text-[36px] text-center leading-tight">
                    All in One Rental and Services
                    <br />
                    Platform for International Student
                </h1>
                <SearchBox />
            </div>
        </div>
    )
}
export default HomeBanner