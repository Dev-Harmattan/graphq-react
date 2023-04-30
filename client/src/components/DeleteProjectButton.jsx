import { FaTrash, FaEdit } from 'react-icons/fa';
import { DELETE_PROJECT } from '../mutations/pojectMutations';
import { GET_PROJECTS } from '../queries/projectQueries';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

const DeleteProjectButton = ({ projectId, onEdit }) => {
  const navigate = useNavigate();
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate('/'),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  return (
    <div className="d-flex justify-content-center align-items-center mt-5 gap-3">
      <div onClick={() => deleteProject(projectId)} className="d-flex mt-5 ">
        <div className="btn btn-danger">
          <FaTrash className="icon m-2" /> Delete Project
        </div>
      </div>
      <div onClick={onEdit} className="d-flex mt-5 ">
        <div className="btn btn-danger">
          <FaEdit className="icon m-2" /> Update Project
        </div>
      </div>
    </div>
  );
};

export default DeleteProjectButton;
