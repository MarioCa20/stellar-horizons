import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Home, Rocket } from 'lucide-react';
import styles from './NotFound.module.css';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFound}>
      <div className={styles.content}>
        <Rocket className={styles.rocket} size={64} />
        <h1>404</h1>
        <h2>¡Houston, tenemos un problema!</h2>
        <p>Parece que te has aventurado en un sector inexplorado del espacio.</p>
        <Button 
          variant="light" 
          size="lg" 
          onClick={() => navigate('/')}
          className="d-flex align-items-center gap-2"
        >
          <Home size={20} />
          Volver a la Tierra
        </Button>
      </div>
      <div className={styles.stars}></div>
    </div>
  );
};
