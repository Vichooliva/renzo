import {
  ShieldCheck, Briefcase, FileText, Scale, Handshake, DatabaseZap, Landmark, FolderSearch, GraduationCap, Newspaper, BotMessageSquare
} from 'lucide-react';
import { Module, UserRole, ModuleId } from './types';

import AsesoriaLegal from './components/modules/AsesoriaLegal';
import GestionContratos from './components/modules/GestionContratos';
import RiesgosCompliance from './components/modules/RiesgosCompliance';
import DefensaLegal from './components/modules/DefensaLegal';
import RelacionesLaborales from './components/modules/RelacionesLaborales';
import ProteccionDatos from './components/modules/ProteccionDatos';
import GobiernoCorporativo from './components/modules/GobiernoCorporativo';
import RelacionesInstitucionales from './components/modules/RelacionesInstitucionales';
import GestionDocumental from './components/modules/GestionDocumental';
import CapacitacionLegal from './components/modules/CapacitacionLegal';
import ActualidadJuridica from './components/modules/ActualidadJuridica';

export const USER_ROLES: UserRole[] = [
  UserRole.AbogadoSenior,
  UserRole.LegalAssistant,
  UserRole.ComplianceOfficer,
  UserRole.RRHHLegal,
  UserRole.UsuarioGeneral,
];

export const MODULES: Module[] = [
  {
    id: ModuleId.Asesoria,
    name: 'Asesoría Legal Estratégica',
    Icon: BotMessageSquare,
    component: AsesoriaLegal,
    allowedRoles: [UserRole.AbogadoSenior, UserRole.LegalAssistant, UserRole.ComplianceOfficer, UserRole.RRHHLegal, UserRole.UsuarioGeneral],
  },
  {
    id: ModuleId.Contratos,
    name: 'Gestión de Contratos',
    Icon: FileText,
    component: GestionContratos,
    allowedRoles: [UserRole.AbogadoSenior, UserRole.LegalAssistant, UserRole.ComplianceOfficer],
  },
  {
    id: ModuleId.Riesgos,
    name: 'Riesgos y Compliance',
    Icon: ShieldCheck,
    component: RiesgosCompliance,
    allowedRoles: [UserRole.AbogadoSenior, UserRole.ComplianceOfficer],
  },
  {
    id: ModuleId.Defensa,
    name: 'Defensa Legal y Litigios',
    Icon: Scale,
    component: DefensaLegal,
    allowedRoles: [UserRole.AbogadoSenior, UserRole.LegalAssistant],
  },
  {
    id: ModuleId.Laboral,
    name: 'Relaciones Laborales',
    Icon: Briefcase,
    component: RelacionesLaborales,
    allowedRoles: [UserRole.AbogadoSenior, UserRole.RRHHLegal],
  },
  {
    id: ModuleId.Datos,
    name: 'Protección de Datos',
    Icon: DatabaseZap,
    component: ProteccionDatos,
    allowedRoles: [UserRole.AbogadoSenior, UserRole.ComplianceOfficer],
  },
  {
    id: ModuleId.Gobierno,
    name: 'Gobierno Corporativo',
    Icon: Landmark,
    component: GobiernoCorporativo,
    allowedRoles: [UserRole.AbogadoSenior, UserRole.LegalAssistant, UserRole.RRHHLegal],
  },
  {
    id: ModuleId.Institucional,
    name: 'Relaciones Institucionales',
    Icon: Handshake,
    component: RelacionesInstitucionales,
    allowedRoles: [UserRole.AbogadoSenior],
  },
  {
    id: ModuleId.Documental,
    name: 'Gestión Documental',
    Icon: FolderSearch,
    component: GestionDocumental,
    allowedRoles: [UserRole.AbogadoSenior, UserRole.LegalAssistant, UserRole.ComplianceOfficer, UserRole.RRHHLegal],
  },
  {
    id: ModuleId.Capacitacion,
    name: 'Capacitación Legal',
    Icon: GraduationCap,
    component: CapacitacionLegal,
    allowedRoles: [UserRole.AbogadoSenior, UserRole.LegalAssistant, UserRole.ComplianceOfficer, UserRole.RRHHLegal, UserRole.UsuarioGeneral],
  },
  {
    id: ModuleId.Actualidad,
    name: 'Actualidad Jurídica',
    Icon: Newspaper,
    component: ActualidadJuridica,
    allowedRoles: [UserRole.AbogadoSenior, UserRole.LegalAssistant, UserRole.ComplianceOfficer, UserRole.RRHHLegal, UserRole.UsuarioGeneral],
  },
];