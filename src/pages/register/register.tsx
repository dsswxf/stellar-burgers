import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { registerUser, clearUserError } from '../../services/slices/userSlice';
import { selectUserError } from '../../services/selectors';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorText = useSelector(selectUserError);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    dispatch(clearUserError());
  }, [dispatch]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ name: userName, email, password })).then(
      (result) => {
        if (registerUser.fulfilled.match(result)) {
          navigate('/');
        }
      }
    );
  };

  return (
    <RegisterUI
      errorText={errorText ?? ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
