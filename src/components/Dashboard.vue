<template>
  <div class="space-y-6">
    <!-- Welcome Section -->
    <div class="glass rounded-2xl p-8 border border-white/20">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            ¡Bienvenido, {{ authStore.user?.name }}! 👋
          </h1>
          <p class="text-gray-600 text-lg">
            Aquí tienes un resumen de la actividad del área legal de Salcobrand
          </p>
        </div>
        <div class="hidden lg:block">
          <div class="w-24 h-24 bg-gradient-to-br from-salcobrand-500 to-emerald-500 rounded-2xl flex items-center justify-center">
            <Scale class="w-12 h-12 text-white" />
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="card group">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors">
              Consultas Totales
            </p>
            <p class="text-3xl font-bold text-gray-900 mt-1">
              {{ dashboardStats.totalConsultations }}
            </p>
            <p class="text-sm text-emerald-600 mt-1">
              +12% vs mes anterior
            </p>
          </div>
          <div class="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl group-hover:scale-110 transition-transform">
            <MessageSquare class="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      <div class="card group">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors">
              Consultas Pendientes
            </p>
            <p class="text-3xl font-bold text-orange-600 mt-1">
              {{ dashboardStats.pendingConsultations }}
            </p>
            <p class="text-sm text-orange-600 mt-1">
              Requieren atención
            </p>
          </div>
          <div class="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl group-hover:scale-110 transition-transform">
            <Clock class="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      <div class="card group">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors">
              Contratos Activos
            </p>
            <p class="text-3xl font-bold text-gray-900 mt-1">
              {{ dashboardStats.totalContracts }}
            </p>
            <p class="text-sm text-emerald-600 mt-1">
              +5% vs mes anterior
            </p>
          </div>
          <div class="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl group-hover:scale-110 transition-transform">
            <FileText class="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      <div class="card group">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors">
              En Revisión
            </p>
            <p class="text-3xl font-bold text-purple-600 mt-1">
              {{ dashboardStats.contractsInReview }}
            </p>
            <p class="text-sm text-purple-600 mt-1">
              Contratos pendientes
            </p>
          </div>
          <div class="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform">
            <Eye class="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions & Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Quick Actions -->
      <div class="card">
        <h3 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Zap class="w-6 h-6 mr-2 text-salcobrand-600" />
          Acciones Rápidas
        </h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <router-link v-for="module in availableModules.slice(0, 4)" 
                       :key="module.id"
                       :to="module.route"
                       class="group p-4 border border-gray-200 rounded-xl hover:border-salcobrand-300 hover:shadow-md transition-all duration-200">
            <div class="flex items-center space-x-3">
              <div class="p-2 rounded-lg bg-gradient-to-br"
                   :class="module.color">
                <component :is="getIcon(module.icon)" class="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 class="font-medium text-gray-900 group-hover:text-salcobrand-700 transition-colors">
                  {{ module.name }}
                </h4>
                <p class="text-sm text-gray-600">{{ module.description }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="card">
        <h3 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Activity class="w-6 h-6 mr-2 text-salcobrand-600" />
          Actividad Reciente
        </h3>
        
        <div class="space-y-4">
          <div v-for="activity in dashboardStats.recentActivity" 
               :key="activity.timestamp.toString()"
               class="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div class="p-2 rounded-lg"
                 :class="getActivityColor(activity.type)">
              <component :is="getActivityIcon(activity.type)" class="w-4 h-4 text-white" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900">{{ activity.action }}</p>
              <p class="text-sm text-gray-600 truncate">{{ activity.description }}</p>
              <div class="flex items-center space-x-2 mt-1">
                <span class="text-xs text-gray-500">{{ formatRelativeTime(activity.timestamp) }}</span>
                <span v-if="activity.userName" class="text-xs text-gray-500">• {{ activity.userName }}</span>
              </div>
            </div>
          </div>
          
          <div v-if="dashboardStats.recentActivity.length === 0" 
               class="text-center py-8 text-gray-500">
            <Activity class="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No hay actividad reciente</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Performance Chart Placeholder -->
    <div class="card">
      <h3 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <TrendingUp class="w-6 h-6 mr-2 text-salcobrand-600" />
        Rendimiento del Área Legal
      </h3>
      
      <div class="bg-gradient-to-r from-salcobrand-50 to-emerald-50 rounded-xl p-8 text-center">
        <BarChart3 class="w-16 h-16 mx-auto mb-4 text-salcobrand-400" />
        <h4 class="text-lg font-medium text-gray-900 mb-2">Gráficos de Rendimiento</h4>
        <p class="text-gray-600 mb-4">
          Visualiza métricas detalladas, tendencias y análisis del área legal
        </p>
        <button class="btn-primary">
          Ver Reportes Completos
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useModulesStore } from '@/stores/modules'
import { 
  Scale, MessageSquare, Clock, FileText, Eye, Zap, Activity, 
  TrendingUp, BarChart3, Newspaper, User
} from 'lucide-vue-next'

const authStore = useAuthStore()
const modulesStore = useModulesStore()

const dashboardStats = computed(() => modulesStore.dashboardStats)
const availableModules = computed(() => {
  return modulesStore.getModulesByRole(authStore.userRole)
})

const getIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    MessageSquare,
    FileText,
    Newspaper,
    BarChart3
  }
  return icons[iconName] || MessageSquare
}

const getActivityIcon = (type: string) => {
  const icons: Record<string, any> = {
    consultation: MessageSquare,
    contract: FileText,
    news: Newspaper,
    user: User
  }
  return icons[type] || Activity
}

const getActivityColor = (type: string) => {
  const colors: Record<string, string> = {
    consultation: 'bg-blue-500',
    contract: 'bg-emerald-500',
    news: 'bg-purple-500',
    user: 'bg-orange-500'
  }
  return colors[type] || 'bg-gray-500'
}

const formatRelativeTime = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - new Date(date).getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `hace ${days} día${days > 1 ? 's' : ''}`
  if (hours > 0) return `hace ${hours} hora${hours > 1 ? 's' : ''}`
  if (minutes > 0) return `hace ${minutes} minuto${minutes > 1 ? 's' : ''}`
  return 'hace un momento'
}

onMounted(() => {
  modulesStore.loadDashboardData()
})
</script>