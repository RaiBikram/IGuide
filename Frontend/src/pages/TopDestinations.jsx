import DestinationCard from "@/components/DestinationCard";


const TopDestinations = () => {
  return (

      <div className="max-w-screen-xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Top Destinations
        </h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Explore the world’s most amazing destinations. Find your next
          adventure today!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <DestinationCard key={index} />
          ))}
        </div>
      </div>

  );
};

export default TopDestinations;
