import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';
import { ADD_PROJECT } from '../mutations/pojectMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import Spinner from './Spinner';

const AddProjectModal = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('new');
  const [clientId, setClientId] = useState('');

  //GET CLIENTS
  const { loading, error, data } = useQuery(GET_CLIENTS);

  //ADD PROJECT
  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: addProject }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });

      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === '' || description === '' || status === '' || clientId === '') {
      return alert('Please enter correct input values');
    }

    addProject(name, description, status, clientId);

    setName('');
    setDescription('');
    setStatus('new');
    setClientId('');
  };

  const statusOptions = [
    { label: 'Not Started', value: 'new' },
    { label: 'In Progress', value: 'progress' },
    { label: 'Completed', value: 'completed' },
  ];

  if (loading) return <Spinner />;

  if (error) return <div>Something went wrong.</div>;
  return (
    <>
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModal"
          >
            <div className="d-flex justify-content-center">
              <FaList className="icon" />
              <div>New Project</div>
            </div>
          </button>

          <div
            className="modal fade"
            id="addProjectModal"
            aria-labelledby="addProjectModal"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="addProjectModal">
                    New Project
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={onSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Phone</label>
                      <select
                        id="status"
                        className="form-select"
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                      >
                        {statusOptions.map((status, index) => (
                          <option key={index} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">ClientId</label>
                      <select
                        id="clientId"
                        className="form-select"
                        onChange={(e) => setClientId(e.target.value)}
                        value={clientId}
                      >
                        <option>Select Client</option>
                        {data?.clients.map((client, index) => (
                          <option key={index} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddProjectModal;
