import { useQuery } from 'react-query';  // Importing from React Query v3
import axios from 'axios';
const fetchBuses = async (fromLocation, toLocation) => {
  const { data } = await axios.get(`http://localhost:5000/api/buses?from=${fromLocation}&to=${toLocation}`);
  return data;
};
const useBusData = (fromLocation, toLocation) => {
  return useQuery(
    ['buses', fromLocation, toLocation], 
    () => fetchBuses(fromLocation, toLocation),
    {
      enabled: !!fromLocation && !!toLocation, 
    }
  );
};
export default useBusData;

