<template>
  <div class="fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0"
       :class="{ '-translate-x-full': !isOpen, 'translate-x-0': isOpen }">
    
    <!-- Overlay para móvil -->
    <div v-if="isOpen" 
         @click="$emit('close')"
         class="fixed inset-0 bg-black/50 lg:hidden"></div>
    
    <!-- Sidebar -->
    <div class="relative flex flex-col h-full glass border-r border-white/20">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-white/10">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-salcobrand-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <Scale class="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 class="text-lg font-bold text-gray-800">Legal Hub</h1>
            <p class="text-xs text-gray-600">Grupo Salcobrand</p>
          </div>
        </div>
        <button @click="$emit('close')" class="lg:hidden p-2 rounded-lg hover:bg-white/10">
          <X class="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <!-- User Info -->
      <div class="p-4 border-b border-white/10">
        <div class="flex items-center space-x-3">
          <img :src="authStore.user?.avatar" 
               :alt="authStore.user?.name"
               class="w-10 h-10 rounded-full object-cover border-2 border-white/20">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-800 truncate">
              {{ authStore.user?.name }}
            </p>
            <p class="text-xs text-gray-600 truncate">
              {{ authStore.user?.department }}
            </p>
          </div>
          <div class="flex items-center space-x-1">
            <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <span class="text-xs text-gray-600 capitalize">{{ authStore.user?.role }}</span>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
        <!-- Dashboard -->
        <router-link to="/" 
                     class="sidebar-item"
                     :class="{ 'active': $route.path === '/' }">
          <LayoutDashboard class="w-5 h-5 text-gray-600" />
          <span class="text-sm font-medium text-gray-700">Dashboard</span>
        </router-link>

        <!-- Modules -->
        <div class="pt-4">
          <h3 class="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Módulos
          </h3>
          <div class="space-y-1">
            <router-link v-for="module in availableModules" 
                         :key="module.id"
                         :to="module.route"
                         class="sidebar-item"
                         :class="{ 'active': $route.path === module.route }">
              <component :is="getIcon(module.icon)" class="w-5 h-5 text-gray-600" />
              <span class="text-sm font-medium text-gray-700">{{ module.name }}</span>
            </router-link>
          </div>
        </div>

        <!-- Role Switcher (Solo para demo) -->
        <div class="pt-4 border-t border-white/10">
          <h3 class="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Demo - Cambiar Rol
          </h3>
          <div class="space-y-1">
            <button v-for="role in ['admin', 'lawyer', 'user']"
                    :key="role"
                    @click="switchRole(role)"
                    class="w-full sidebar-item"
                    :class="{ 'active': authStore.user?.role === role }">
              <Users class="w-4 h-4 text-gray-600" />
              <span class="text-sm font-medium text-gray-700 capitalize">{{ role }}</span>
            </button>
          </div>
        </div>
      </nav>

      <!-- Footer -->
      <div class="p-4 border-t border-white/10">
        <button @click="logout" 
                class="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <LogOut class="w-5 h-5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useModulesStore } from '@/stores/modules'
import { 
  Scale, X, LayoutDashboard, MessageSquare, FileText, 
  Newspaper, BarChart3, Users, LogOut 
} from 'lucide-vue-next'

defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  close: []
}>()

const router = useRouter()
const authStore = useAuthStore()
const modulesStore = useModulesStore()

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

const switchRole = (role: 'admin' | 'lawyer' | 'user') => {
  authStore.switchRole(role)
  // Recargar para actualizar módulos disponibles
  window.location.reload()
}

const logout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>