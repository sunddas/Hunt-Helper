import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';

const EditJob = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); 


  const existingJob = location.state?.job;

 
  const [formData, setFormData] = useState({
    company: existingJob?.company || '',
    position: existingJob?.position || '',
    location: existingJob?.location || '',
    status: existingJob?.status || 'Pending',
    salary: existingJob?.salary || ''
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
     
      await axios.put(`/api/jobs/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      navigate('/');
    } catch (err) {
      console.error(err);
      alert("Failed to update job");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen p-8 flex justify-center items-start pt-20">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Update Application </h2>
          <Link to="/" className="text-slate-400 hover:text-slate-600 text-xl font-bold">✕</Link>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
      
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
            <input type="text" name="company" value={formData.company} onChange={onChange} required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          
       
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Position</label>
            <input type="text" name="position" value={formData.position} onChange={onChange} required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

      
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Salary</label>
            <input type="text" name="salary" value={formData.salary} onChange={onChange} 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

         
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
              <input type="text" name="location" value={formData.location} onChange={onChange} 
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select name="status" value={formData.status} onChange={onChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                <option value="Pending">Pending</option>
                <option value="Interviewed">Interviewed</option>
                <option value="Rejected">Rejected</option>
                <option value="Applied">Applied</option>
                <option value="Offered">Offered</option>
                <option value="Accepted">Accepted</option>
              </select>
            </div>
          </div>
          
          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg shadow-md transition-colors mt-4">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditJob;