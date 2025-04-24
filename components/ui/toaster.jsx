import { useEffect } from 'react';

export function Toaster() {
  useEffect(() => {
    console.log('Toaster initialized');
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4">
      <p>Notification</p>
    </div>
  );
}