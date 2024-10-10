import React, { useState } from 'react';
import { ref, get } from 'firebase/database';
import { db } from './firebase';

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const userRef = ref(db, 'users/' + username);

    try {
      const snapshot = await get(userRef);
      const user = snapshot.val();

      if (user && String(user.password) === password) {
        setUser(user); // Устанавливаем пользователя после успешного входа
      } else {
        alert('Неверный логин или пароль');
      }
    } catch (error) {
      console.error("Ошибка при авторизации:", error);
      alert('Произошла ошибка при авторизации');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.heading}>Login</h2>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          style={styles.input} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={styles.input} 
          required 
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    width: '300px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  heading: {
    marginBottom: '15px',
    textAlign: 'center',
    color: '#333',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default LoginForm;
