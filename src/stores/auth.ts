import { defineStore } from 'pinia'
import type { User } from '@/types'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
    loading: false
  }),

  getters: {
    currentUser: (state) => state.user,
    userRole: (state) => state.user?.role || 'user',
    isAdmin: (state) => state.user?.role === 'admin',
    isLawyer: (state) => state.user?.role === 'lawyer'
  },

  actions: {
    async login(email: string, password: string) {
      this.loading = true
      try {
        // Simulación de login - en producción conectar con MongoDB
        const mockUsers: User[] = [
          {
            _id: '1',
            email: 'admin@salcobrand.cl',
            name: 'María González',
            role: 'admin',
            department: 'Legal',
            avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
          },
          {
            _id: '2',
            email: 'lawyer@salcobrand.cl',
            name: 'Carlos Rodríguez',
            role: 'lawyer',
            department: 'Legal',
            avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
          },
          {
            _id: '3',
            email: 'user@salcobrand.cl',
            name: 'Ana Martínez',
            role: 'user',
            department: 'Recursos Humanos',
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
          }
        ]

        const user = mockUsers.find(u => u.email === email)
        if (user && password === '123456') {
          this.user = user
          this.isAuthenticated = true
          localStorage.setItem('salcobrand_user', JSON.stringify(user))
          return { success: true }
        } else {
          return { success: false, error: 'Credenciales inválidas' }
        }
      } catch (error) {
        return { success: false, error: 'Error de conexión' }
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('salcobrand_user')
    },

    async checkAuth() {
      const savedUser = localStorage.getItem('salcobrand_user')
      if (savedUser) {
        this.user = JSON.parse(savedUser)
        this.isAuthenticated = true
      }
    },

    switchRole(newRole: 'admin' | 'lawyer' | 'user') {
      if (this.user) {
        this.user.role = newRole
        localStorage.setItem('salcobrand_user', JSON.stringify(this.user))
      }
    }
  }
})