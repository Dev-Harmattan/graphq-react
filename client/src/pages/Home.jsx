import AddClientModal from '../components/AddClientModal';
import AddProjectModal from '../components/AddProjectModal';
import Projects from '../components/Projects';
import Client from '../components/Client';

const Home = () => {
  return (
    <>
      <div className="d-flex gap-3">
        <AddClientModal />
        <AddProjectModal />
      </div>
      <Projects />
      <hr />
      <Client />
    </>
  );
};

export default Home;
