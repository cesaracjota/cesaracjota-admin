import { Routes, Route } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import LoginPage from '../pages/auth/LoginPage';
import AdminPage from '../pages/ui/AdminPage';
import UsuarioPage from '../pages/ui/UsuarioPage';
import ConfiguracionPage from '../pages/ui/ConfiguracionPage';
import ArchivosPage from '../pages/ui/ArchivosPage';
import CertificadoPage from '../pages/ui/CertificadoPage';
import MensajePage from '../pages/ui/MensajePage';
import CalendarioPage from '../pages/ui/CalendarioPage';
import TechSkillsPage from '../pages/ui/TechSkillsPage';
import ProjectPage from '../pages/ui/ProjectPage';
import NotFoundPage from '../components/layout/NotFoundPage'
import '../styles/globals.css';

export const AppRouter = () => {

    return (
        <Routes>
            <Route path="/" exact element={<PrivateRoutes />} >
                <Route path="/" exact element={<AdminPage />} />
                <Route path="/usuarios" element={<UsuarioPage />} />
                <Route path="/admin/calendario" element={<CalendarioPage />} />
                <Route path="/configuracion" element={<ConfiguracionPage />} />
                <Route path="/archivos" element={<ArchivosPage />} />
                <Route path="/certificados" element={<CertificadoPage />} />
                <Route path="/mensajes" element={<MensajePage />} />
                <Route path="/techskills" element={<TechSkillsPage />} />
                <Route path="/projects" element={<ProjectPage />} />
            </Route>
            <Route element={<PublicRoutes />}>
                <Route path="/auth/login" element={<LoginPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}