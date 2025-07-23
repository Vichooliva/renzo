<template>
  <div class="space-y-6">
    <!-- Header con filtros -->
    <div class="card">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Actualidad Jurídica</h3>
          <p class="text-sm text-gray-600">Mantente al día con las últimas noticias y cambios legales</p>
        </div>
        
        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <select v-model="filterCategory" 
                  class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-salcobrand-500 text-sm">
            <option value="">Todas las categorías</option>
            <option value="laboral">Laboral</option>
            <option value="tributario">Tributario</option>
            <option value="comercial">Comercial</option>
            <option value="corporativo">Corporativo</option>
            <option value="regulatorio">Regulatorio</option>
          </select>
          
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input v-model="searchQuery" 
                   type="text" 
                   placeholder="Buscar noticias..."
                   class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-salcobrand-500 text-sm w-full sm:w-64">
          </div>
        </div>
      </div>
    </div>

    <!-- Estadísticas -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Noticias</p>
            <p class="text-2xl font-bold text-gray-900">{{ news.length }}</p>
          </div>
          <div class="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
            <Newspaper class="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Esta Semana</p>
            <p class="text-2xl font-bold text-blue-600">{{ thisWeekNews.length }}</p>
          </div>
          <div class="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
            <Calendar class="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Guardadas</p>
            <p class="text-2xl font-bold text-emerald-600">{{ savedNews.length }}</p>
          </div>
          <div class="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg">
            <Bookmark class="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Categorías</p>
            <p class="text-2xl font-bold text-orange-600">{{ uniqueCategories.length }}</p>
          </div>
          <div class="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
            <Tag class="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>

    <!-- Lista de noticias -->
    <div class="space-y-4">
      <div v-for="article in filteredNews" 
           :key="article._id"
           class="card hover:shadow-lg transition-all duration-300">
        
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center space-x-3">
            <div class="p-2 rounded-lg"
                 :class="getCategoryColor(article.category)">
              <component :is="getCategoryIcon(article.category)" class="w-5 h-5 text-white" />
            </div>
            <div>
              <span class="text-sm font-medium text-gray-900 capitalize">{{ article.category }}</span>
              <div class="flex items-center space-x-2 mt-1">
                <span class="text-xs text-gray-500">{{ formatDate(article.publishedAt) }}</span>
                <span v-if="article.source" class="text-xs text-gray-500">• {{ article.source }}</span>
              </div>
            </div>
          </div>
          
          <div class="flex items-center space-x-2">
            <button @click="toggleSaved(article)" 
                    class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    :class="{ 'text-yellow-500': article.saved, 'text-gray-400': !article.saved }">
              <Bookmark class="w-5 h-5" :class="{ 'fill-current': article.saved }" />
            </button>
            <button v-if="article.url" 
                    @click="openExternal(article.url)"
                    class="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600">
              <ExternalLink class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div class="mb-4">
          <h4 class="text-lg font-semibold text-gray-900 mb-2 leading-tight">{{ article.title }}</h4>
          <p class="text-gray-700 leading-relaxed">{{ article.content }}</p>
        </div>

        <div v-if="article.tags && article.tags.length > 0" class="flex flex-wrap gap-2">
          <span v-for="tag in article.tags" 
                :key="tag"
                class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
            #{{ tag }}
          </span>
        </div>
      </div>

      <!-- Estado vacío -->
      <div v-if="filteredNews.length === 0" 
           class="card text-center py-12">
        <Newspaper class="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">No se encontraron noticias</h3>
        <p class="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
      </div>
    </div>

    <!-- Paginación simple -->
    <div v-if="filteredNews.length > 0" class="card">
      <div class="flex items-center justify-between">
        <p class="text-sm text-gray-600">
          Mostrando {{ filteredNews.length }} de {{ news.length }} noticias
        </p>
        <div class="flex items-center space-x-2">
          <button class="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  disabled>
            Anterior
          </button>
          <span class="px-3 py-1 text-sm bg-salcobrand-100 text-salcobrand-700 rounded-lg">1</span>
          <button class="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  disabled>
            Siguiente
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useModulesStore } from '@/stores/modules'
import { 
  Newspaper, Calendar, Bookmark, Tag, Search, ExternalLink,
  Briefcase, Building, Calculator, FileText, Shield
} from 'lucide-vue-next'

const modulesStore = useModulesStore()

const filterCategory = ref('')
const searchQuery = ref('')

const news = computed(() => modulesStore.news)

const thisWeekNews = computed(() => {
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  return news.value.filter(article => new Date(article.publishedAt) >= oneWeekAgo)
})

const savedNews = computed(() => {
  return news.value.filter(article => article.saved)
})

const uniqueCategories = computed(() => {
  return [...new Set(news.value.map(article => article.category))]
})

const filteredNews = computed(() => {
  return news.value.filter(article => {
    const categoryMatch = !filterCategory.value || article.category === filterCategory.value
    const searchMatch = !searchQuery.value || 
      article.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (article.tags && article.tags.some(tag => 
        tag.toLowerCase().includes(searchQuery.value.toLowerCase())
      ))
    
    return categoryMatch && searchMatch
  })
})

const getCategoryIcon = (category: string) => {
  const icons: Record<string, any> = {
    laboral: Briefcase,
    comercial: Building,
    tributario: Calculator,
    corporativo: FileText,
    regulatorio: Shield
  }
  return icons[category] || Newspaper
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    laboral: 'bg-blue-500',
    comercial: 'bg-emerald-500',
    tributario: 'bg-purple-500',
    corporativo: 'bg-orange-500',
    regulatorio: 'bg-red-500'
  }
  return colors[category] || 'bg-gray-500'
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const toggleSaved = (article: any) => {
  article.saved = !article.saved
}

const openExternal = (url: string) => {
  window.open(url, '_blank')
}

onMounted(() => {
  modulesStore.loadDashboardData()
})
</script>