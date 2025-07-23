<template>
  <div class="space-y-6">
    <!-- Header con estadísticas -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Contratos</p>
            <p class="text-2xl font-bold text-gray-900">{{ contracts.length }}</p>
          </div>
          <div class="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
            <FileText class="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">En Revisión</p>
            <p class="text-2xl font-bold text-orange-600">{{ contractsInReview.length }}</p>
          </div>
          <div class="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
            <Clock class="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Aprobados</p>
            <p class="text-2xl font-bold text-emerald-600">{{ approvedContracts.length }}</p>
          </div>
          <div class="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg">
            <CheckCircle class="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Valor Total</p>
            <p class="text-2xl font-bold text-salcobrand-600">
              ${{ totalValue.toLocaleString('es-CL') }}
            </p>
          </div>
          <div class="p-3 bg-gradient-to-br from-salcobrand-500 to-salcobrand-600 rounded-lg">
            <DollarSign class="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>

    <!-- Kanban Board -->
    <div class="card">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-gray-900">Gestión de Contratos - Kanban</h3>
        <button @click="showNewContractModal = true" class="btn-primary">
          <Plus class="w-4 h-4 mr-2" />
          Nuevo Contrato
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Columna Draft -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="font-medium text-gray-900 flex items-center">
              <div class="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
              Borrador
            </h4>
            <span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {{ getContractsByStatus('draft').length }}
            </span>
          </div>
          <div class="space-y-3 min-h-[400px] bg-gray-50 rounded-lg p-3">
            <ContractCard v-for="contract in getContractsByStatus('draft')"
                         :key="contract._id"
                         :contract="contract"
                         @update="updateContractStatus" />
          </div>
        </div>

        <!-- Columna Review -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="font-medium text-gray-900 flex items-center">
              <div class="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>
              En Revisión
            </h4>
            <span class="text-sm text-gray-500 bg-orange-100 px-2 py-1 rounded-full">
              {{ getContractsByStatus('review').length }}
            </span>
          </div>
          <div class="space-y-3 min-h-[400px] bg-orange-50 rounded-lg p-3">
            <ContractCard v-for="contract in getContractsByStatus('review')"
                         :key="contract._id"
                         :contract="contract"
                         @update="updateContractStatus" />
          </div>
        </div>

        <!-- Columna Approved -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="font-medium text-gray-900 flex items-center">
              <div class="w-3 h-3 bg-emerald-400 rounded-full mr-2"></div>
              Aprobado
            </h4>
            <span class="text-sm text-gray-500 bg-emerald-100 px-2 py-1 rounded-full">
              {{ getContractsByStatus('approved').length }}
            </span>
          </div>
          <div class="space-y-3 min-h-[400px] bg-emerald-50 rounded-lg p-3">
            <ContractCard v-for="contract in getContractsByStatus('approved')"
                         :key="contract._id"
                         :contract="contract"
                         @update="updateContractStatus" />
          </div>
        </div>

        <!-- Columna Signed -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="font-medium text-gray-900 flex items-center">
              <div class="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
              Firmado
            </h4>
            <span class="text-sm text-gray-500 bg-blue-100 px-2 py-1 rounded-full">
              {{ getContractsByStatus('signed').length }}
            </span>
          </div>
          <div class="space-y-3 min-h-[400px] bg-blue-50 rounded-lg p-3">
            <ContractCard v-for="contract in getContractsByStatus('signed')"
                         :key="contract._id"
                         :contract="contract"
                         @update="updateContractStatus" />
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Nuevo Contrato -->
    <Transition name="fade">
      <div v-if="showNewContractModal" 
           class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="glass rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Nuevo Contrato</h3>
            <button @click="showNewContractModal = false" 
                    class="p-2 hover:bg-gray-100 rounded-lg">
              <X class="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form @submit.prevent="createContract" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input v-model="newContract.title" 
                     type="text" 
                     required
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-salcobrand-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select v-model="newContract.type" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-salcobrand-500">
                <option value="compra">Compra</option>
                <option value="venta">Venta</option>
                <option value="servicio">Servicio</option>
                <option value="laboral">Laboral</option>
                <option value="confidencialidad">Confidencialidad</option>
                <option value="otros">Otros</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Cliente/Contraparte</label>
              <input v-model="newContract.client" 
                     type="text"
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-salcobrand-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Valor (CLP)</label>
              <input v-model.number="newContract.value" 
                     type="number"
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-salcobrand-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea v-model="newContract.description" 
                        rows="3"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-salcobrand-500 resize-none"></textarea>
            </div>

            <div class="flex space-x-3 pt-4">
              <button type="button" 
                      @click="showNewContractModal = false"
                      class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Cancelar
              </button>
              <button type="submit" class="flex-1 btn-primary">
                Crear Contrato
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useModulesStore } from '@/stores/modules'
import type { Contract } from '@/types'
import { 
  FileText, Clock, CheckCircle, DollarSign, Plus, X 
} from 'lucide-vue-next'

// Contract Card Component
const ContractCard = {
  props: ['contract'],
  emits: ['update'],
  template: `
    <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
      <div class="flex items-start justify-between mb-3">
        <h5 class="font-medium text-gray-900 text-sm leading-tight">{{ contract.title }}</h5>
        <div class="flex items-center space-x-1">
          <button @click="$emit('update', contract._id, 'draft')" 
                  class="w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded text-xs flex items-center justify-center"
                  title="Mover a Borrador">
            📝
          </button>
          <button @click="$emit('update', contract._id, 'review')" 
                  class="w-6 h-6 bg-orange-100 hover:bg-orange-200 rounded text-xs flex items-center justify-center"
                  title="Mover a Revisión">
            👁️
          </button>
          <button @click="$emit('update', contract._id, 'approved')" 
                  class="w-6 h-6 bg-emerald-100 hover:bg-emerald-200 rounded text-xs flex items-center justify-center"
                  title="Aprobar">
            ✅
          </button>
          <button @click="$emit('update', contract._id, 'signed')" 
                  class="w-6 h-6 bg-blue-100 hover:bg-blue-200 rounded text-xs flex items-center justify-center"
                  title="Marcar como Firmado">
            ✍️
          </button>
        </div>
      </div>
      
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full capitalize">
            {{ contract.type }}
          </span>
          <span v-if="contract.value" class="text-xs font-medium text-gray-600">
            ${{ contract.value?.toLocaleString('es-CL') }}
          </span>
        </div>
        
        <p v-if="contract.client" class="text-xs text-gray-600">
          <strong>Cliente:</strong> {{ contract.client }}
        </p>
        
        <p v-if="contract.assignedTo" class="text-xs text-gray-600">
          <strong>Asignado:</strong> {{ contract.assignedTo }}
        </p>
        
        <p v-if="contract.description" class="text-xs text-gray-500 line-clamp-2">
          {{ contract.description }}
        </p>
        
        <div v-if="contract.startDate" class="text-xs text-gray-500">
          <strong>Inicio:</strong> {{ new Date(contract.startDate).toLocaleDateString('es-CL') }}
        </div>
      </div>
    </div>
  `
}

const modulesStore = useModulesStore()

const showNewContractModal = ref(false)
const newContract = ref({
  title: '',
  type: 'servicio' as const,
  client: '',
  value: 0,
  description: ''
})

const contracts = computed(() => modulesStore.contracts)
const contractsInReview = computed(() => modulesStore.contractsInReview)
const approvedContracts = computed(() => 
  contracts.value.filter(c => c.status === 'approved')
)

const totalValue = computed(() => {
  return contracts.value.reduce((sum, contract) => sum + (contract.value || 0), 0)
})

const getContractsByStatus = (status: string) => {
  return contracts.value.filter(contract => contract.status === status)
}

const updateContractStatus = async (contractId: string, newStatus: string) => {
  await modulesStore.updateContract(contractId, { status: newStatus as any })
}

const createContract = async () => {
  if (!newContract.value.title.trim()) return
  
  const contract: Contract = {
    _id: Date.now().toString(),
    title: newContract.value.title,
    type: newContract.value.type,
    status: 'draft',
    client: newContract.value.client || undefined,
    value: newContract.value.value || undefined,
    description: newContract.value.description || undefined,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
  modulesStore.contracts.push(contract)
  
  // Reset form
  newContract.value = {
    title: '',
    type: 'servicio',
    client: '',
    value: 0,
    description: ''
  }
  
  showNewContractModal.value = false
}

onMounted(() => {
  modulesStore.loadDashboardData()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>