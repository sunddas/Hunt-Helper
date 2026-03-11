import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get('/api/jobs', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setJobs(res.data); 
      } catch (err) {
        console.error(err);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchJobs();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login');               
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete job.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12 font-sans">
      
      <nav className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Hunt-Helper</h1>
        <button 
          onClick={handleLogout}
          className="text-sm font-medium cursor-pointer text-gray-500 hover:text-gray-900 transition-colors"
        >
          Logout
        </button>
      </nav>

      <div className="px-8 max-w-5xl mx-auto">
        
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">Applications</h2>
          <Link 
            to="/add-job" 
            className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors"
          >
            + New Application
          </Link>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {jobs?.length > 0 ? (
            jobs.map((job) => (
              <div key={job._id} className="p-5 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                
                <div className="mb-4">
                  <h3 className="font-semibold text-lg text-gray-900">{job.company}</h3>
                  <p className="text-gray-600 text-sm">{job.position}</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">Salary: </span> 
                    {job.salary || 'N/A'}
                  </p>
                </div>

                <div className="flex flex-col space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-md ${
                      job.status === 'Applied' ? 'bg-blue-50 text-blue-700' :
                      job.status === 'Interview' ? 'bg-yellow-50 text-yellow-700' :
                      job.status === 'Offer' ? 'bg-green-50 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {job.status}
                    </span>
                    <span className="text-sm text-gray-500 truncate max-w-[8rem]">
                      {job.location || 'Remote'}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 pt-3 border-t border-gray-100">
                    <Link
                      to={`/edit-job/${job._id}`}
                      state={{ job }}
                      className="text-sm  font-medium text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="text-sm cursor-pointer font-medium text-red-600 hover:text-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>

              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-white rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500 mb-4">No applications found.</p>
              <Link 
                to="/add-job" 
                className="text-sm font-medium text-gray-900 hover:underline"
              >
                Start your first application
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;