import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';

const WelcomeComponent = () => {
  const navigate = useNavigate();

  const handleRedirect = (url: string) => navigate(url);

  return (
    <div className={styles.welcome}>
      <div className={styles.image}>
        <img
          src="https://web.letmespeak.org/static/media/welcome.e401ce2cc62f60a8e599bcbb26504c74.svg"
          alt=""
        />
      </div>

      <div className={styles.block}>
        <h1 className={styles.header}>
          Welcome to
          <br />
          the Let Me Speak world
        </h1>

        <p className={styles.content}>You'll start speaking English today!</p>

        <button onClick={() => handleRedirect('/sign-up')} className={styles.btnAuth}>
          I'm new here
        </button>

        <button onClick={() => handleRedirect('/login')} className={styles.btnAuth}>
          I've got an account
        </button>
      </div>
    </div>
  );
};

export default WelcomeComponent;
