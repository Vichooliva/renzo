<template>
  <div class="space-y-6">
    <!-- Header con estadísticas -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Consultas Totales</p>
            <p class="text-2xl font-bold text-gray-900">{{ consultations.length }}</p>
          </div>
          <div class="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
            <MessageSquare class="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Pendientes</p>
            <p class="text-2xl font-bold text-orange-600">{{ pendingConsultations.length }}</p>
          </div>
          <div class="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
            <Clock class="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Respondidas</p>
            <p class="text-2xl font-bold text-emerald-600">{{ answeredConsultations.length }}</p>
          </div>
          <div class="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg">
            <CheckCircle class="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>

    <!-- Nueva consulta -->
    <div class="card">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Bot class="w-5 h-5 mr-2 text-salcobrand-600" />
        Nueva Consulta Legal IA
      </h3>
      
      <form @submit.prevent="submitConsultation" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
          <select v-model="newConsultation.category" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-salcobrand-500 focus:border-transparent">
            <option value="laboral">Laboral</option>
            <option value="comercial">Comercial</option>
            <option value="tributario">Tributario</option>
            <option value="corporativo">Corporativo</option>
            <option value="otros">Otros</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
          <select v-model="newConsultation.priority" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-salcobrand-500 focus:border-transparent">
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Consulta</label>
          <textarea v-model="newConsultation.question" 
                    rows="4"
                    placeholder="Describe tu consulta legal de manera detallada..."
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-salcobrand-500 focus:border-transparent resize-none"></textarea>
        </div>

        <button type="submit" 
                :disabled="!newConsultation.question.trim() || isSubmitting"
                class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
          <Send class="w-4 h-4 mr-2" />
          {{ isSubmitting ? 'Enviando...' : 'Enviar Consulta' }}
        </button>
      </form>
    </div>

    <!-- Lista de consultas -->
    <div class="card">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-gray-900">Historial de Consultas</h3>
        <div class="flex items-center space-x-2">
          <select v-model="filterCategory" 
                  class="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-salcobrand-500">
            <option value="">Todas las categorías</option>
            <option value="laboral">Laboral</option>
            <option value="comercial">Comercial</option>
            <option value="tributario">Tributario</option>
            <option value="corporativo">Corporativo</option>
            <option value="otros">Otros</option>
          </select>
          <select v-model="filterStatus" 
                  class="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-salcobrand-500">
            <option value="">Todos los estados</option>
            <option value="pending">Pendiente</option>
            <option value="answered">Respondida</option>
            <option value="closed">Cerrada</option>
          </select>
        </div>
      </div>

      <div class="space-y-4">
        <div v-for="consultation in filteredConsultations" 
             :key="consultation._id"
             class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center space-x-3">
              <div class="p-2 rounded-lg"
                   :class="getCategoryColor(consultation.category)">
                <component :is="getCategoryIcon(consultation.category)" class="w-4 h-4 text-white" />
              </div>
              <div>
                <span class="text-sm font-medium text-gray-900 capitalize">{{ consultation.category }}</span>
                <div class="flex items-center space-x-2 mt-1">
                  <span class="px-2 py-1 text-xs rounded-full"
                        :class="getStatusColor(consultation.status)">
                    {{ getStatusText(consultation.status) }}
                  </span>
                  <span class="px-2 py-1 text-xs rounded-full"
                        :class="getPriorityColor(consultation.priority)">
                    {{ getPriorityText(consultation.priority) }}
                  </span>
                </div>
              </div>
            </div>
            <span class="text-xs text-gray-500">
              {{ formatDate(consultation.createdAt) }}
            </span>
          </div>

          <div class="mb-3">
            <p class="text-sm text-gray-700 leading-relaxed">{{ consultation.question }}</p>
          </div>

          <div v-if="consultation.response" class="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
            <div class="flex items-center mb-2">
              <Bot class="w-4 h-4 text-emerald-600 mr-2" />
              <span class="text-sm font-medium text-emerald-800">Respuesta IA</span>
            </div>
            <p class="text-sm text-emerald-700">{{ consultation.response }}</p>
          </div>
        </div>

        <div v-if="filteredConsultations.length === 0" 
             class="text-center py-8 text-gray-500">
          <MessageSquare class="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No hay consultas que coincidan con los filtros seleccionados</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useModulesStore } from '@/stores/modules'
import type { LegalConsultation } from '@/types'
import { 
  MessageSquare, Clock, CheckCircle, Bot, Send, 
  Briefcase, Building, Calculator, FileText, HelpCircle 
} from 'lucide-vue-next'

const authStore = useAuthStore()
const modulesStore = useModulesStore()

const isSubmitting = ref(false)
const filterCategory = ref('')
const filterStatus = ref('')

const newConsultation = ref({
  question: '',
  category: 'laboral' as const,
  priority: 'medium' as const
})

const consultations = computed(() => modulesStore.consultations)
const pendingConsultations = computed(() => modulesStore.pendingConsultations)
const answeredConsultations = computed(() => 
  consultations.value.filter(c => c.status === 'answered')
)

const filteredConsultations = computed(() => {
  return consultations.value.filter(consultation => {
    const categoryMatch = !filterCategory.value || consultation.category === filterCategory.value
    const statusMatch = !filterStatus.value || consultation.status === filterStatus.value
    return categoryMatch && statusMatch
  })
})

const submitConsultation = async () => {
  if (!newConsultation.value.question.trim()) return
  
  isSubmitting.value = true
  
  try {
    await modulesStore.addConsultation({
      userId: authStore.user?._id || '',
      question: newConsultation.value.question,
      category: newConsultation.value.category,
      priority: newConsultation.value.priority,
      status: 'pending'
    })
    
    // Simular respuesta IA después de 2 segundos
    setTimeout(async () => {
      const lastConsultation = consultations.value[0]
      if (lastConsultation && lastConsultation.status === 'pending') {
        const aiResponse = generateAIResponse(lastConsultation.question, lastConsultation.category)
        lastConsultation.response = aiResponse
        lastConsultation.status = 'answered'
      }
    }, 2000)
    
    // Limpiar formulario
    newConsultation.value.question = ''
    newConsultation.value.category = 'laboral'
    newConsultation.value.priority = 'medium'
    
  } catch (error) {
    console.error('Error al enviar consulta:', error)
  } finally {
    isSubmitting.value = false
  }
}

const generateAIResponse = (question: string, category: string): string => {
  const responses: Record<string, string[]> = {
    laboral: [
      'Según el Código del Trabajo chileno, en casos de despido por necesidades de la empresa, se debe cumplir con el procedimiento establecido en el artículo 161 y pagar las indemnizaciones correspondientes.',
      'Para este tipo de situación laboral, recomiendo revisar la jurisprudencia reciente de la Dirección del Trabajo y considerar los precedentes establecidos.',
      'Es importante verificar que se cumplan todos los requisitos legales y que la documentación esté en orden antes de proceder.'
    ],
    comercial: [
      'En contratos comerciales internacionales, es fundamental incluir cláusulas de resolución de conflictos y especificar la legislación aplicable.',
      'Recomiendo revisar las condiciones de pago, garantías y cláusulas de fuerza mayor para proteger los intereses de Salcobrand.',
      'Es aconsejable incluir cláusulas de confidencialidad y no competencia según corresponda.'
    ],
    tributario: [
      'Según la normativa tributaria vigente, es importante considerar las implicaciones del IVA y otros impuestos aplicables.',
      'Recomiendo consultar con el SII para obtener claridad sobre la interpretación de la norma en casos específicos.',
      'Es fundamental mantener la documentación tributaria actualizada y cumplir con los plazos establecidos.'
    ],
    corporativo: [
      'Para temas corporativos, es importante revisar los estatutos sociales y las facultades del directorio.',
      'Recomiendo verificar el cumplimiento de las formalidades legales y los registros correspondientes.',
      'Es aconsejable mantener actualizados todos los registros societarios y cumplir con las obligaciones de información.'
    ],
    otros: [
      'Para esta consulta específica, recomiendo una revisión detallada de la normativa aplicable.',
      'Es importante considerar todos los aspectos legales relevantes y buscar precedentes similares.',
      'Sugiero programar una reunión para analizar el caso en profundidad.'
    ]
  }
  
  const categoryResponses = responses[category] || responses.otros
  return categoryResponses[Math.floor(Math.random() * categoryResponses.length)]
}

const getCategoryIcon = (category: string) => {
  const icons: Record<string, any> = {
    laboral: Briefcase,
    comercial: Building,
    tributario: Calculator,
    corporativo: FileText,
    otros: HelpCircle
  }
  return icons[category] || HelpCircle
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    laboral: 'bg-blue-500',
    comercial: 'bg-emerald-500',
    tributario: 'bg-purple-500',
    corporativo: 'bg-orange-500',
    otros: 'bg-gray-500'
  }
  return colors[category] || 'bg-gray-500'
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    answered: 'bg-emerald-100 text-emerald-800',
    closed: 'bg-gray-100 text-gray-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status: string) => {
  const texts: Record<string, string> = {
    pending: 'Pendiente',
    answered: 'Respondida',
    closed: 'Cerrada'
  }
  return texts[status] || status
}

const getPriorityColor = (priority: string) => {
  const colors: Record<string, string> = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  }
  return colors[priority] || 'bg-gray-100 text-gray-800'
}

const getPriorityText = (priority: string) => {
  const texts: Record<string, string> = {
    low: 'Baja',
    medium: 'Media',
    high: 'Alta'
  }
  return texts[priority] || priority
}

const formatDate = (date?: Date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  modulesStore.loadDashboardData()
})
</script>