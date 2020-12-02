import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/user';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logIn('admin', 'admin'));
  }, []);
  return (
    <div> App </div>
  );
}

export default App;
