<template>
  <div class="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- Sidebar -->
    <Sidebar :isOpen="sidebarOpen" @close="sidebarOpen = false" />
    
    <!-- Main Content -->
    <div class="flex-1 flex flex-col lg:ml-64">
      <!-- Header -->
      <Header @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      
      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import Header from '@/components/layout/Header.vue'

const sidebarOpen = ref(false)
</script>