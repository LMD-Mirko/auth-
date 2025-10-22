import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin.js';
import { useToast } from '../../../components/ui/ToastProvider.jsx';
import Button from '../../../components/ui/Button.jsx';
import Input from '../../../components/ui/Input.jsx';
import Alert from '../../../components/ui/Alert.jsx';
import cohetitoImage from '../../../assets/cohetito.png';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const { formData, handleInputChange, handleSubmit, isLoading, error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { success, error: showError } = useToast();

  const onSubmit = async (e) => {
    const loginSuccess = await handleSubmit(e);
    if (loginSuccess) {
      success('¡Bienvenido! Inicio de sesión exitoso');
      navigate('/profile');
    }
  };


  return (
    <div className={styles.loginContainer}>
      {/* Panel izquierdo - Formulario */}
      <div className={styles.formPanel}>
        <div className={styles.formContent}>
          {/* Logo */}
          <div className={styles.logoSection}>
            <div className={styles.logoContainer}>
              <div className={styles.logoIcon}>
                <svg className={styles.logoIconSvg} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm2 2a1 1 0 000 2h8a1 1 0 100-2H5z" clipRule="evenodd" />
                </svg>
              </div>
              <span className={styles.logoText}>AuthLab</span>
            </div>
            <h2 className={styles.title}>Iniciar Sesión</h2>
            <p className={styles.subtitle}>
              ¿No tienes una cuenta?{' '}
              <Link to="/register" className={styles.subtitleLink}>
                Regístrate aquí
              </Link>
            </p>
          </div>

          {/* Formulario */}
          <form className={styles.form} onSubmit={onSubmit}>
            {error && (
              <Alert type="error" message={error} />
            )}

            <div className={styles.formGroup}>
              <Input
                label="Correo Electrónico"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="tu@email.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <Input
                label="Contraseña"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Tu contraseña"
                showPasswordToggle
                required
              />
            </div>

            <div className={styles.optionsRow}>
              <div className={styles.checkboxContainer}>
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className={styles.checkbox}
                />
                <label htmlFor="remember-me" className={styles.checkboxLabel}>
                  Recordarme
                </label>
              </div>

              <a href="#" className={styles.forgotLink}>
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="large"
              loading={isLoading}
              disabled={isLoading}
              className={styles.submitButton}
            >
              Iniciar Sesión
            </Button>

            {/* Footer */}
            <div className={styles.footer}>
              <p className={styles.footerText}>© 2025 juas juas. Todos los derechos reservados.</p>
              <div className={styles.footerLinks}>
                <a href="#" className={styles.footerLink}>Términos de Servicio</a>
                <span className={styles.footerSeparator}>|</span>
                <a href="#" className={styles.footerLink}>Política de Privacidad</a>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Panel derecho - Ilustración */}
      <div className={styles.illustrationPanel}>
        <div className={styles.overlay}></div>
        
        {/* Estrellas */}
        <div className={styles.stars}>
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={styles.star}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Nubes */}
        <div className={`${styles.cloud} ${styles.cloud1}`}></div>
        <div className={`${styles.cloud} ${styles.cloud2}`}></div>
        <div className={`${styles.cloud} ${styles.cloud3}`}></div>

        {/* Montañas */}
        <div className={styles.mountains}>
          <div className={`${styles.mountain} ${styles.mountain1}`}></div>
          <div className={`${styles.mountain} ${styles.mountain2}`}></div>
          <div className={`${styles.mountain} ${styles.mountain3}`}></div>
        </div>

        {/* Cohete */}
        <div className={styles.rocketContainer}>
          <div className={styles.rocketContent}>
            <h3 className={styles.rocketTitle}>¡Bienvenido!</h3>
            <p className={styles.rocketSubtitle}>Inicia tu viaje hacia el éxito</p>
            
            <div className={styles.rocketWrapper}>
              <div className={styles.smokeEffect}>
                <div className={styles.smoke1}></div>
                <div className={styles.smoke2}></div>
                <div className={styles.smoke3}></div>
              </div>
              <img 
                src={cohetitoImage} 
                alt="Cohete" 
                className={styles.rocketImage}
              />
            </div>
          </div>
        </div>

        {/* Watermark */}
        <div className={styles.watermark}>
          AuthLab
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
