<template>
  <header class="glass border-b border-white/20 px-6 py-4">
    <div class="flex items-center justify-between">
      <!-- Mobile menu button -->
      <button @click="$emit('toggle-sidebar')" 
              class="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors">
        <Menu class="w-6 h-6 text-gray-600" />
      </button>

      <!-- Page title -->
      <div class="flex-1 lg:ml-0 ml-4">
        <h1 class="text-2xl font-bold bg-gradient-to-r from-salcobrand-600 to-emerald-600 bg-clip-text text-transparent">
          {{ pageTitle }}
        </h1>
        <p class="text-sm text-gray-600 mt-1">{{ pageDescription }}</p>
      </div>

      <!-- Actions -->
      <div class="flex items-center space-x-4">
        <!-- Notifications -->
        <button class="relative p-2 rounded-lg hover:bg-white/10 transition-colors">
          <Bell class="w-6 h-6 text-gray-600" />
          <span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {{ pendingNotifications }}
          </span>
        </button>

        <!-- Search -->
        <div class="hidden md:block relative">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" 
                 placeholder="Buscar..."
                 class="pl-10 pr-4 py-2 bg-white/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-salcobrand-500 focus:border-transparent text-sm">
        </div>

        <!-- User menu -->
        <div class="relative">
          <button @click="showUserMenu = !showUserMenu"
                  class="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-colors">
            <img :src="authStore.user?.avatar" 
                 :alt="authStore.user?.name"
                 class="w-8 h-8 rounded-full object-cover border-2 border-white/20">
            <ChevronDown class="w-4 h-4 text-gray-600" />
          </button>

          <!-- Dropdown menu -->
          <Transition name="fade">
            <div v-if="showUserMenu" 
                 class="absolute right-0 mt-2 w-48 glass rounded-lg shadow-lg border border-white/20 py-2 z-50">
              <div class="px-4 py-2 border-b border-white/10">
                <p class="text-sm font-medium text-gray-800">{{ authStore.user?.name }}</p>
                <p class="text-xs text-gray-600">{{ authStore.user?.email }}</p>
              </div>
              <button class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-white/10 transition-colors">
                <User class="w-4 h-4 inline mr-2" />
                Perfil
              </button>
              <button class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-white/10 transition-colors">
                <Settings class="w-4 h-4 inline mr-2" />
                Configuración
              </button>
              <hr class="border-white/10 my-2">
              <button @click="logout" 
                      class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                <LogOut class="w-4 h-4 inline mr-2" />
                Cerrar Sesión
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useModulesStore } from '@/stores/modules'
import { 
  Menu, Bell, Search, ChevronDown, User, Settings, LogOut 
} from 'lucide-vue-next'

defineEmits<{
  'toggle-sidebar': []
}>()

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const modulesStore = useModulesStore()

const showUserMenu = ref(false)

const pageTitle = computed(() => {
  if (route.path === '/') return 'Dashboard'
  
  const module = modulesStore.modules.find(m => m.route === route.path)
  return module?.name || 'Legal Hub'
})

const pageDescription = computed(() => {
  if (route.path === '/') return 'Resumen de actividades y estadísticas del área legal'
  
  const module = modulesStore.modules.find(m => m.route === route.path)
  return module?.description || 'Plataforma legal interna'
})

const pendingNotifications = computed(() => {
  return modulesStore.dashboardStats.pendingConsultations + modulesStore.dashboardStats.contractsInReview
})

const logout = async () => {
  showUserMenu.value = false
  await authStore.logout()
  router.push('/login')
}

// Cerrar menú al hacer click fuera
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>