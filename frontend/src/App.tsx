import React, { useState, useRef } from 'react';
import { AppShell } from './layouts/AppShell';
import { HomePage } from './pages/HomePage';

export const App: React.FC = () => {
  const [hasActiveLesson, setHasActiveLesson] = useState(false);
  const newLessonHandlerRef = useRef<(() => void) | null>(null);

  const handleNewLessonTrigger = () => {
    if (newLessonHandlerRef.current) {
      newLessonHandlerRef.current();
    }
  };

  return (
    <AppShell
      hasActiveLesson={hasActiveLesson}
      onNewLesson={handleNewLessonTrigger}
    >
      <HomePage
        onStateChange={setHasActiveLesson}
        onNewLessonRegister={(cb) => {
          newLessonHandlerRef.current = cb;
        }}
      />
    </AppShell>
  );
};

export default App;
