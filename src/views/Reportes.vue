<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="card">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Reportes y Analytics</h1>
      <p class="text-gray-600">Análisis detallado del rendimiento del área legal</p>
    </div>

    <!-- Coming Soon -->
    <div class="card text-center py-16">
      <BarChart3 class="w-24 h-24 mx-auto mb-6 text-gray-300" />
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Próximamente</h2>
      <p class="text-gray-600 mb-8 max-w-md mx-auto">
        Esta sección incluirá reportes detallados, gráficos interactivos y análisis 
        avanzado del rendimiento del área legal.
      </p>
      <div class="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
        <span class="flex items-center">
          <div class="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
          Métricas de consultas
        </span>
        <span class="flex items-center">
          <div class="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
          Análisis de contratos
        </span>
        <span class="flex items-center">
          <div class="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
          Tendencias temporales
        </span>
        <span class="flex items-center">
          <div class="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
          Reportes personalizados
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BarChart3 } from 'lucide-vue-next'
</script>