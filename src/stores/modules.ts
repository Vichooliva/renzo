import { defineStore } from 'pinia'
import type { Module, LegalConsultation, Contract, LegalNews, DashboardStats } from '@/types'

export const useModulesStore = defineStore('modules', {
  state: () => ({
    modules: [
      {
        id: 'asesoria',
        name: 'Asesoría Legal IA',
        description: 'Consultas legales inteligentes con IA',
        icon: 'MessageSquare',
        route: '/asesoria',
        roles: ['admin', 'lawyer', 'user'],
        color: 'from-blue-500 to-blue-600'
      },
      {
        id: 'contratos',
        name: 'Gestión de Contratos',
        description: 'Administra contratos y documentos legales',
        icon: 'FileText',
        route: '/contratos',
        roles: ['admin', 'lawyer'],
        color: 'from-emerald-500 to-emerald-600'
      },
      {
        id: 'actualidad',
        name: 'Actualidad Jurídica',
        description: 'Noticias y actualizaciones legales',
        icon: 'Newspaper',
        route: '/actualidad',
        roles: ['admin', 'lawyer', 'user'],
        color: 'from-purple-500 to-purple-600'
      },
      {
        id: 'reportes',
        name: 'Reportes y Analytics',
        description: 'Estadísticas y reportes del área legal',
        icon: 'BarChart3',
        route: '/reportes',
        roles: ['admin'],
        color: 'from-orange-500 to-orange-600'
      }
    ] as Module[],
    
    consultations: [] as LegalConsultation[],
    contracts: [] as Contract[],
    news: [] as LegalNews[],
    dashboardStats: {
      totalConsultations: 0,
      pendingConsultations: 0,
      totalContracts: 0,
      contractsInReview: 0,
      recentActivity: []
    } as DashboardStats
  }),

  getters: {
    getModulesByRole: (state) => (userRole: string) => {
      return state.modules.filter(module => module.roles.includes(userRole))
    },
    
    pendingConsultations: (state) => {
      return state.consultations.filter(c => c.status === 'pending')
    },
    
    contractsInReview: (state) => {
      return state.contracts.filter(c => c.status === 'review')
    }
  },

  actions: {
    async loadDashboardData() {
      // Simulación de datos - en producción conectar con MongoDB
      this.consultations = [
        {
          _id: '1',
          userId: '1',
          question: '¿Cuáles son las implicaciones legales de un despido por necesidades de la empresa?',
          category: 'laboral',
          status: 'pending',
          priority: 'high',
          createdAt: new Date('2024-01-15')
        },
        {
          _id: '2',
          userId: '2',
          question: 'Necesito revisar un contrato de servicios con un proveedor internacional',
          response: 'He revisado el contrato y sugiero las siguientes modificaciones...',
          category: 'comercial',
          status: 'answered',
          priority: 'medium',
          createdAt: new Date('2024-01-14')
        }
      ]

      this.contracts = [
        {
          _id: '1',
          title: 'Contrato de Servicios - Proveedor Logístico',
          type: 'servicio',
          status: 'review',
          assignedTo: 'Carlos Rodríguez',
          client: 'LogiTrans S.A.',
          value: 150000,
          startDate: new Date('2024-02-01'),
          endDate: new Date('2024-12-31'),
          description: 'Servicios de logística y distribución para farmacias'
        },
        {
          _id: '2',
          title: 'Contrato Laboral - Gerente de Ventas',
          type: 'laboral',
          status: 'approved',
          assignedTo: 'María González',
          client: 'Juan Pérez',
          startDate: new Date('2024-01-15'),
          description: 'Contrato indefinido para posición gerencial'
        }
      ]

      this.news = [
        {
          _id: '1',
          title: 'Nueva Ley de Protección de Datos Personales entra en vigencia',
          content: 'La nueva normativa establece requisitos más estrictos para el tratamiento de datos personales...',
          category: 'regulatorio',
          source: 'Diario Oficial',
          publishedAt: new Date('2024-01-15'),
          tags: ['datos personales', 'privacidad', 'regulación']
        },
        {
          _id: '2',
          title: 'Cambios en la Legislación Laboral para 2024',
          content: 'Se aprueban modificaciones importantes en el Código del Trabajo...',
          category: 'laboral',
          source: 'Ministerio del Trabajo',
          publishedAt: new Date('2024-01-12'),
          tags: ['laboral', 'código del trabajo', '2024']
        }
      ]

      this.dashboardStats = {
        totalConsultations: this.consultations.length,
        pendingConsultations: this.consultations.filter(c => c.status === 'pending').length,
        totalContracts: this.contracts.length,
        contractsInReview: this.contracts.filter(c => c.status === 'review').length,
        recentActivity: [
          {
            type: 'consultation',
            action: 'Nueva consulta',
            description: 'Consulta sobre despido por necesidades de la empresa',
            timestamp: new Date('2024-01-15T10:30:00'),
            userName: 'Ana Martínez'
          },
          {
            type: 'contract',
            action: 'Contrato aprobado',
            description: 'Contrato Laboral - Gerente de Ventas',
            timestamp: new Date('2024-01-14T16:45:00'),
            userName: 'María González'
          },
          {
            type: 'news',
            action: 'Nueva actualización',
            description: 'Ley de Protección de Datos Personales',
            timestamp: new Date('2024-01-15T08:00:00'),
            userName: 'Sistema'
          }
        ]
      }
    },

    async addConsultation(consultation: Omit<LegalConsultation, '_id' | 'createdAt' | 'updatedAt'>) {
      const newConsultation: LegalConsultation = {
        ...consultation,
        _id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      this.consultations.unshift(newConsultation)
      this.dashboardStats.totalConsultations++
      this.dashboardStats.pendingConsultations++
    },

    async updateContract(contractId: string, updates: Partial<Contract>) {
      const index = this.contracts.findIndex(c => c._id === contractId)
      if (index !== -1) {
        this.contracts[index] = { ...this.contracts[index], ...updates, updatedAt: new Date() }
      }
    }
  }
})