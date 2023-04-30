import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import ClientInfo from '../components/ClientInfo';
import { GET_PROJECT } from '../queries/projectQueries';
import DeleteProjectButton from '../components/DeleteProjectButton';
import EditProjectForm from '../components/EditProjectForm';
import { useState } from 'react';

const Project = () => {
  const [isEditMode, setEditMode] = useState(false);
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  const editHandler = () => {
    setEditMode((current) => !current);
  };

  if (loading) return <Spinner />;

  if (error) return <div>Something went wrong.</div>;

  if (!loading && !error)
    return (
      <div className="mx-auto card w-75 p-5">
        <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
          Back
        </Link>
        <h5>{data?.project.name}</h5>
        <p>{data?.project.description}</p>

        <h5 className="mt-3">Project Status</h5>
        <p className="lead">{data?.project.status}</p>
        <ClientInfo client={data?.project.client} />
        {isEditMode && (
          <EditProjectForm project={data?.project} onEdit={editHandler} />
        )}
        <DeleteProjectButton
          projectId={data?.project.id}
          onEdit={editHandler}
        />
      </div>
    );
};

export default Project;
