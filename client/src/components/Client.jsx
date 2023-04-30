import { useQuery } from '@apollo/client';
import ClientRow from './ClientRow';
import Spinner from './Spinner';
import { GET_CLIENTS } from '../queries/clientQueries';

const Client = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />;

  if (error) return <div>Something went wrong.</div>;

  if (!loading && !error)
    return (
      <table className="table table-hover mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.clients.map((client, index) => (
            <ClientRow key={index} client={client} />
          ))}
        </tbody>
      </table>
    );
};

export default Client;
