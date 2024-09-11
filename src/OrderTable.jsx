import React, {useEffect, useState} from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Fetcher = ({}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false);


    const endpoint = "https://jsonplaceholder.typicode.com/users" ;
    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(endpoint);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const result = await response.json();
          setData(result);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchData();
      }, [endpoint, refresh]);
    
      if (loading) 
        return <Spinner animation="border" />;
      else if (error) 
        return <div>Error: {error}</div>;

      else console.log(data);

      const handleRefresh = () => {
        fetchData();
      };

      return (
        <div>
          <button onClick={handleRefresh}>Refresh Data</button>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {data.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.name}</td>
                  <td>{order.username}</td>
                  <td>{order.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };



export default Fetcher;