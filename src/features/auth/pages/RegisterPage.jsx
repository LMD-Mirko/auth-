import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister.js';
import { useToast } from '../../../components/ui/ToastProvider.jsx';
import Button from '../../../components/ui/Button.jsx';
import Input from '../../../components/ui/Input.jsx';
import Alert from '../../../components/ui/Alert.jsx';
import cohetitoImage from '../../../assets/cohetito.png';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const { formData, handleInputChange, handleSubmit, isLoading, error } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();
  const { success, error: showError } = useToast();

  // Función para concatenar nombres y apellidos
  const concatenateNames = (name, paternal, maternal) => {
    const parts = [name, paternal, maternal].filter(part => part && part.trim());
    return parts.join(' ');
  };

  // Función para desconcatenar nombre completo
  const splitFullName = (fullName) => {
    const parts = fullName.trim().split(' ');
    if (parts.length === 0) return { name: '', paternal: '', maternal: '' };
    if (parts.length === 1) return { name: parts[0], paternal: '', maternal: '' };
    if (parts.length === 2) return { name: parts[0], paternal: parts[1], maternal: '' };
    
    // Si hay 3 o más partes, el primer nombre es el nombre, el penúltimo es paterno, el último es materno
    const name = parts[0];
    const maternal = parts[parts.length - 1];
    const paternal = parts.slice(1, -1).join(' ');
    
    return { name, paternal, maternal };
  };

  // Manejar cambio en el campo de nombre completo
  const handleFullNameChange = (e) => {
    const value = e.target.value;
    setFullName(value);
    
    const { name, paternal, maternal } = splitFullName(value);
    
    // Actualizar los campos individuales
    handleInputChange({
      target: { name: 'name', value: name }
    });
    handleInputChange({
      target: { name: 'paternal_lastname', value: paternal }
    });
    handleInputChange({
      target: { name: 'maternal_lastname', value: maternal }
    });
  };

  // Sincronizar el nombre completo cuando cambien los campos individuales
  useEffect(() => {
    const fullNameValue = concatenateNames(
      formData.name || '',
      formData.paternal_lastname || '',
      formData.maternal_lastname || ''
    );
    setFullName(fullNameValue);
  }, [formData.name, formData.paternal_lastname, formData.maternal_lastname]);

  const onSubmit = async (e) => {
    const registerSuccess = await handleSubmit(e);
    if (registerSuccess) {
      success('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión');
      navigate('/login');
    }
  };

  return (
    <div className={styles.registerContainer}>
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
            <h2 className={styles.title}>Crear Cuenta</h2>
            <p className={styles.subtitle}>
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className={styles.subtitleLink}>
                Inicia sesión aquí
              </Link>
            </p>
          </div>

          {/* Formulario */}
          <form className={styles.form} onSubmit={onSubmit}>
            {error && (
              <Alert type="error" message={error} />
            )}

            <div className={styles.formSections}>
              {/* Información personal */}
              <div className={styles.formSection}>
                <Input
                  label="Nombre Completo"
                  name="full_name"
                  value={fullName}
                  onChange={handleFullNameChange}
                  placeholder="Nombre Apellido Paterno Apellido Materno"
                  required
                />

                <div className={styles.formGrid}>
                  <Input
                    label="Número de Documento"
                    name="document_number"
                    value={formData.document_number}
                    onChange={handleInputChange}
                    placeholder="12345678"
                    required
                  />

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

                <div className={styles.formGrid}>
                  <Input
                    label="Teléfono"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="987654321"
                    required
                  />

                  <Input
                    label="Nombre de Usuario"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleInputChange}
                    placeholder="usuario123"
                    required
                  />
                </div>
              </div>

              {/* Contraseñas */}
              <div className={styles.formSection}>
                <div className={styles.formGrid}>
                  <Input
                    label="Contraseña"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Mínimo 8 caracteres"
                    showPasswordToggle
                    required
                  />

                  <Input
                    label="Confirmar Contraseña"
                    type="password"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleInputChange}
                    placeholder="Confirma tu contraseña"
                    showPasswordToggle
                    required
                  />
                </div>
              </div>

              {/* Términos y condiciones */}
              <div className={styles.checkboxContainer}>
                <input
                  id="account_statement"
                  name="account_statement"
                  type="checkbox"
                  checked={formData.account_statement}
                  onChange={handleInputChange}
                  className={styles.checkbox}
                />
                <label htmlFor="account_statement" className={styles.checkboxLabel}>
                  Acepto los{' '}
                  <a href="#" className={styles.termsLink}>
                    términos y condiciones
                  </a>
                </label>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="large"
              loading={isLoading}
              disabled={isLoading}
              className={styles.submitButton}
            >
              Crear Cuenta
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
            <h3 className={styles.rocketTitle}>¡Únete a nosotros!</h3>
            <p className={styles.rocketSubtitle}>Comienza tu aventura hoy</p>
            
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

export default RegisterPage;
