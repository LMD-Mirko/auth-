import { useAuth } from '../../auth/hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../components/ui/ToastProvider.jsx';
import Button from '../../../components/ui/Button.jsx';
import Alert from '../../../components/ui/Alert.jsx';
import styles from './ProfilePage.module.css';
import defaultAvatar from '../../../assets/3769.gif';
import { useEffect } from 'react';

const ProfilePage = () => {
  const { profile, logout, isAuthenticated, isLoading, loadProfile, error } = useAuth();
  const navigate = useNavigate();
  const { success, error: showError } = useToast();

  // Cargar profile cuando el componente se monta
  useEffect(() => {
    if (isAuthenticated && !profile) {
      loadProfile();
    }
  }, [isAuthenticated, profile, loadProfile]);

  const handleLogout = async () => {
    try {
      await logout();
      success('Sesión cerrada correctamente');
      navigate('/login');
    } catch (error) {
      showError('Error al cerrar sesión');
    }
  };

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <svg className={styles.loadingSpinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className={styles.loadingCircle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className={styles.loadingPath} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className={styles.loadingText}>Cargando perfil...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <div className={styles.errorMessage}>Error al cargar el perfil</div>
          <button
            onClick={() => window.location.reload()}
            className={styles.retryButton}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <div className={styles.logoContainer}>
              <svg className={styles.logoIcon} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm2 2a1 1 0 000 2h8a1 1 0 100-2H5z" clipRule="evenodd" />
              </svg>
            </div>
            <span className={styles.logoText}>AuthLab</span>
          </div>
          
          <Button
            onClick={handleLogout}
            variant="secondary"
            size="sm"
            className={styles.logoutButton}
          >
            <svg className={styles.logoutIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar Sesión
          </Button>
        </div>
      </header>

      {/* Contenido principal */}
      <main className={styles.mainContent}>
        <div className={styles.profileCard}>
          {/* Header del perfil */}
          <div className={styles.profileHeader}>
            <div className={styles.profileInfo}>
              {/* Avatar */}
              <div className={styles.avatarContainer}>
                <img
                  className={styles.avatarImage}
                  src={defaultAvatar}
                  alt="Avatar por defecto"
                />
              </div>
              
              {/* Información básica */}
              <div className={styles.profileDetails}>
                <h1 className={styles.profileName}>
                  {profile?.full_name || 'Usuario'}
                </h1>
                <p className={styles.profileEmail}>{profile?.email}</p>
                <div className={styles.badgesContainer}>
                  <span className={styles.badge}>
                    <svg className={styles.badgeIcon} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    {profile?.role?.name || 'Usuario'}
                  </span>
                  <span className={styles.badge}>
                    <svg className={styles.badgeIcon} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {profile?.country?.name || 'País'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Información detallada */}
          <div className={styles.profileDetails}>
            <div className={styles.detailsGrid}>
              {/* Información personal */}
              <div className={styles.detailsSection}>
                <h2 className={styles.sectionTitle}>Información Personal</h2>
                <dl className={styles.detailsList}>
                  <div className={styles.detailItem}>
                    <dt className={styles.detailLabel}>Nombre completo</dt>
                    <dd className={styles.detailValue}>{profile?.full_name || 'N/A'}</dd>
                  </div>
                  <div className={styles.detailItem}>
                    <dt className={styles.detailLabel}>Correo electrónico</dt>
                    <dd className={styles.detailValue}>{profile?.email || 'N/A'}</dd>
                  </div>
                  <div className={styles.detailItem}>
                    <dt className={styles.detailLabel}>Teléfono</dt>
                    <dd className={styles.detailValue}>{profile?.phone || 'N/A'}</dd>
                  </div>
                  <div className={styles.detailItem}>
                    <dt className={styles.detailLabel}>Nombre de usuario</dt>
                    <dd className={styles.detailValue}>{profile?.user_name || 'N/A'}</dd>
                  </div>
                  <div className={styles.detailItem}>
                    <dt className={styles.detailLabel}>Sexo</dt>
                    <dd className={styles.detailValue}>{profile?.sex || 'N/A'}</dd>
                  </div>
                </dl>
              </div>

              {/* Información del documento */}
              <div className={styles.detailsSection}>
                <h2 className={styles.sectionTitle}>Información del Documento</h2>
                <dl className={styles.detailsList}>
                  <div className={styles.detailItem}>
                    <dt className={styles.detailLabel}>Tipo de documento</dt>
                    <dd className={styles.detailValue}>{profile?.document_type?.name || 'N/A'}</dd>
                  </div>
                  <div className={styles.detailItem}>
                    <dt className={styles.detailLabel}>Número de documento</dt>
                    <dd className={styles.detailValue}>{profile?.document_number || 'N/A'}</dd>
                  </div>
                  <div className={styles.detailItem}>
                    <dt className={styles.detailLabel}>País</dt>
                    <dd className={styles.detailValue}>{profile?.country?.name || 'N/A'}</dd>
                  </div>
                  <div className={styles.detailItem}>
                    <dt className={styles.detailLabel}>Región</dt>
                    <dd className={styles.detailValue}>{profile?.region || 'N/A'}</dd>
                  </div>
                  <div className={styles.detailItem}>
                    <dt className={styles.detailLabel}>Provincia</dt>
                    <dd className={styles.detailValue}>{profile?.province || 'N/A'}</dd>
                  </div>
                  <div className={styles.detailItem}>
                    <dt className={styles.detailLabel}>Distrito</dt>
                    <dd className={styles.detailValue}>{profile?.district || 'N/A'}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Estado de la cuenta */}
            <div className={styles.accountStatus}>
              <h2 className={styles.sectionTitle}>Estado de la Cuenta</h2>
              <div className={styles.statusContainer}>
                <div className={`${styles.statusBadge} ${profile?.account_statement ? styles.statusActive : styles.statusInactive}`}>
                  <div className={`${styles.statusDot} ${profile?.account_statement ? styles.dotActive : styles.dotInactive}`}></div>
                  {profile?.account_statement ? 'Cuenta activa' : 'Cuenta inactiva'}
                </div>
                <div className={styles.userId}>
                  ID de usuario: {profile?.id}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
