import React from 'react';
// Import the newly created component
import TeamCard from './components/TeamCard';

export default function App1() {
  return (
    <div className='flex gap-4 p-6'>
      <TeamCard name='Jaakko Lahtinen' role='Mechanic' />
      <TeamCard name='Pertti Korhonen' role='Driver' />
      <TeamCard name='Kalle Hietanen' role='Co-driver' />
    </div>
  );
}