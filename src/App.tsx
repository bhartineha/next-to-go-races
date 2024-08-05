import React from 'react';
import RaceList from './components/RaceList/RaceList';
import styles from './App.module.css';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <h1>Next to go </h1>
      <RaceList />
    </div>
  );
};

export default App;
