import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';
import { UPDATE_PROJECT } from '../mutations/pojectMutations';

const statusOptions = {
  'Not Started': 'new',
  'In Progress': 'progress',
  Completed: 'completed',
};

const statusWithLabel = [
  { label: 'Not Started', value: 'new' },
  { label: 'In Progress', value: 'progress' },
  { label: 'Completed', value: 'completed' },
];

const EditProjectForm = ({ project, onEdit }) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(project.status);

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: project.id,
      name,
      description,
      status: statusOptions[status],
    },
    onCompleted: () => onEdit(),
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const submit = (e) => {
    e.preventDefault();

    if (!name || !description || !status) {
      return alert('Please enter correct input values');
    }
    updateProject();
  };

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={submit}>
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
            {statusWithLabel.map((status, index) => (
              <option key={index} value={statusOptions[status.value]}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditProjectForm;
