import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const { register, authLoading, error, setError } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', location: '', cropsGrown: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      cropsGrown: form.cropsGrown ? form.cropsGrown.split(',').map((crop) => crop.trim()) : [],
    };
    const response = await register(payload);
    if (response.success) {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <h2 className="text-2xl font-semibold text-slate-900">Create your account</h2>
      <p className="mt-1 text-sm text-slate-500">Sign up to unlock smart farming insights.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Input label="Full Name" name="name" value={form.name} onChange={handleChange} />
        <Input label="Email" type="email" name="email" value={form.email} onChange={handleChange} />
        <Input label="Password" type="password" name="password" value={form.password} onChange={handleChange} />
        <Input label="Location" name="location" value={form.location} onChange={handleChange} />
        <Input
          label="Crops Grown (comma separated)"
          name="cropsGrown"
          value={form.cropsGrown}
          onChange={handleChange}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={authLoading}
          className="w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:bg-green-700 disabled:bg-slate-200"
        >
          {authLoading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="text-primary underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium text-slate-600">{label}</label>
    <input {...props} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" required />
  </div>
);

export default Signup;


