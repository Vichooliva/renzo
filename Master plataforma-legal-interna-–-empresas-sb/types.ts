import type { LucideIcon } from 'lucide-react';
import type React from 'react';

export enum UserRole {
  AbogadoSenior = 'Abogado/a Senior',
  LegalAssistant = 'Legal Assistant / Paralegal',
  ComplianceOfficer = 'Compliance Officer',
  RRHHLegal = 'RR.HH. Legal',
  UsuarioGeneral = 'Usuario General Interno',
}

export enum ModuleId {
  Asesoria = 'asesoria',
  Contratos = 'contratos',
  Riesgos = 'riesgos',
  Defensa = 'defensa',
  Laboral = 'laboral',
  Datos = 'datos',
  Gobierno = 'gobierno',
  Institucional = 'institucional',
  Documental = 'documental',
  Capacitacion = 'capacitacion',
  Actualidad = 'actualidad',
}

export interface Module {
  id: ModuleId;
  name: string;
  Icon: LucideIcon;
  component: React.ComponentType<{ userRole: UserRole }>;
  allowedRoles: UserRole[];
}

export enum ContractStatus {
  Borrador = 'Borrador',
  Revision = 'Revisión',
  Firmado = 'Firmado',
  Archivado = 'Archivado',
}

export interface Contract {
  id: string;
  name: string;
  type: string;
  area: string;
  date: string;
  status: ContractStatus;
}

export interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  responsible: string;
}

export interface LegalCase {
  id: string;
  name: string;
  status: string;
  timeline: TimelineEvent[];
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

// Relaciones Laborales
export interface CollectiveAgreement {
  id: string;
  unionName: string;
  effectiveDate: string;
  expirationDate: string;
  documentUrl: string;
}

// Protección de Datos
export enum PrivacyRequestStatus {
  Pendiente = 'Pendiente',
  Completado = 'Completado',
  Vencido = 'Vencido'
}
export interface PrivacyRequest {
  id: string;
  type: 'ARCO' | 'Incidente';
  subject: string;
  requestDate: string;
  dueDate: string;
  status: PrivacyRequestStatus;
}

// Gobierno Corporativo
export interface CorporateDocument {
  id: string;
  name: string;
  type: 'Acta de Directorio' | 'Política' | 'Agenda';
  date: string;
  accessRoles: UserRole[];
}

// Relaciones Institucionales
export interface InstitutionalInteraction {
    id: string;
    date: string;
    type: 'Reunión' | 'Oficio Enviado' | 'Oficio Recibido';
    summary: string;
}
export interface Institution {
    id: string;
    name: string;
    contactPerson: string;
    contactEmail: string;
    interactions: InstitutionalInteraction[];
}

// Gestión Documental
export interface FileNode {
    id: string;
    name: string;
    type: 'folder' | 'file';
    modified: string;
    size?: string;
    children?: FileNode[];
}

// Capacitación Legal
export interface CourseLesson {
  id: string;
  title: string;
  duration: string; // e.g., "15 min"
  completed: boolean;
}
export interface Course {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    tags: string[];
    lessons: CourseLesson[];
}

// Actualidad Jurídica
export interface LegalArticle {
    id: string;
    title: string;
    source: 'Diario Oficial' | 'Biblioteca del Congreso' | 'Blog Legal Interno' | 'Prensa';
    date: string;
    snippet: string;
    tags: ('Tributario' | 'Laboral' | 'Corporativo' | 'Regulatorio')[];
    url: string;
}