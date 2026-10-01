import React from 'react';
import { AppShell } from './layouts/AppShell';
import { HomePage } from './pages/HomePage';

export const App: React.FC = () => {
  return (
    <AppShell>
      <HomePage />
    </AppShell>
  );
};

export default App;
