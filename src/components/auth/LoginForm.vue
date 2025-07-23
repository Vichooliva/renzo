<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo y título -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-salcobrand-500 to-emerald-500 rounded-2xl mb-4">
          <Scale class="w-8 h-8 text-white" />
        </div>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-salcobrand-600 to-emerald-600 bg-clip-text text-transparent">
          Legal Hub
        </h1>
        <p class="text-gray-600 mt-2">Plataforma Legal Interna - Grupo Salcobrand</p>
      </div>

      <!-- Formulario de login -->
      <div class="glass rounded-2xl p-8 shadow-xl">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-salcobrand-500 focus:border-transparent transition-colors"
              placeholder="usuario@salcobrand.cl"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-salcobrand-500 focus:border-transparent transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Eye v-if="!showPassword" class="w-5 h-5" />
                <EyeOff v-else class="w-5 h-5" />
              </button>
            </div>
          </div>

          <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-sm text-red-600">{{ error }}</p>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Loader2 v-if="loading" class="w-5 h-5 mr-2 animate-spin" />
            {{ loading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
          </button>
        </form>

        <!-- Usuarios demo -->
        <div class="mt-8 pt-6 border-t border-gray-200">
          <h3 class="text-sm font-medium text-gray-700 mb-4">Usuarios Demo:</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
              <span class="text-gray-600">admin@salcobrand.cl</span>
              <span class="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">Admin</span>
            </div>
            <div class="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
              <span class="text-gray-600">lawyer@salcobrand.cl</span>
              <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Abogado</span>
            </div>
            <div class="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
              <span class="text-gray-600">user@salcobrand.cl</span>
              <span class="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Usuario</span>
            </div>
            <p class="text-xs text-gray-500 mt-2">Contraseña para todos: <code class="bg-gray-200 px-1 rounded">123456</code></p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center mt-8 text-sm text-gray-500">
        <p>&copy; 2024 Grupo Salcobrand. Todos los derechos reservados.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Scale, Eye, EyeOff, Loader2 } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: ''
})

const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    const result = await authStore.login(form.value.email, form.value.password)
    
    if (result.success) {
      router.push('/')
    } else {
      error.value = result.error || 'Error al iniciar sesión'
    }
  } catch (err) {
    error.value = 'Error de conexión'
  } finally {
    loading.value = false
  }
}
</script>