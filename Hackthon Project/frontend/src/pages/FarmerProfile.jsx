import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';

const FarmerProfile = () => {
  const { user } = useAuth();

  const profileFields = useMemo(
    () => [
      { label: 'Name', value: user?.name },
      { label: 'Email', value: user?.email },
      { label: 'Location', value: user?.location || 'Not specified' },
      {
        label: 'Crops Grown',
        value: user?.cropsGrown?.length ? user.cropsGrown.join(', ') : 'Not specified',
      },
      { label: 'Member since', value: new Date(user?.createdAt || Date.now()).toLocaleDateString() },
    ],
    [user]
  );

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-2xl font-semibold text-slate-900">Farmer Profile</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {profileFields.map((field) => (
            <div key={field.label} className="rounded-xl border border-slate-100 p-4">
              <p className="text-xs uppercase text-slate-400">{field.label}</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">{field.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900">Account Checklist</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
          <li>Add farm coordinates for hyperlocal weather updates.</li>
          <li>Upload soil test to unlock AI fertilizer recommendations.</li>
          <li>Turn on WhatsApp notifications for market alerts.</li>
        </ul>
      </div>
    </div>
  );
};

export default FarmerProfile;


