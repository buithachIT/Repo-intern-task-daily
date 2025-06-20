import FeatureRoomRentalList from "./featureRoomRentalList";

const FeatureRoomRental = () => {
    return (
        <div className="py-4 md:px-40 md:py-20 lg:py-[80px] flex flex-col gap-4 md:gap-8 lg:gap-10 md:bg-[#EFF9FF] px-3 -mx-3 lg:-mx-0">
            <div className="text-left">
                <h1 className="text-primary font-bold text-2xl md:text-3xl lg:text-4xl mb-2">Featured Room Rentals</h1>
            </div>
            <div className="grid">
                <FeatureRoomRentalList />
            </div>
        </div>
    )
}
export default FeatureRoomRental;