<template>
  <div class="h-screen bg-[#F8FAFC] font-plus-jakarta antialiased selection:bg-primary/10 overflow-hidden flex">
    <!-- Slim Admin Sidebar -->
    <AdminSidebar />

    <!-- Main Hub -->
    <div class="flex-1 flex flex-col h-screen relative bg-[#F8FAFC]">
      <!-- Compact Header -->
      <header class="bg-white border-b border-slate-200 sticky top-0 z-[100] w-full px-6 py-4">
        <div class="max-w-[1600px] mx-auto flex justify-between items-center">
          <div>
            <h1 class="text-xl font-black text-slate-900 tracking-tight uppercase">User Management</h1>
            <div class="flex items-center gap-2 mt-1">
              <div class="w-1.5 h-1.5 rounded-full bg-primary"></div>
              <span class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Global User Registry</span>
            </div>
          </div>
          
          <div class="flex items-center gap-4">
             <div class="hidden md:flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 w-64 group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <i class="fas fa-search text-slate-300 text-[10px]"></i>
                <input type="text" placeholder="Search by name or email..." class="bg-transparent border-none outline-none text-[10px] font-bold text-slate-700 placeholder:text-slate-300 w-full" />
             </div>
             <button class="px-4 py-2 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg hover:bg-primary transition-all">Export Data</button>
          </div>
        </div>
      </header>

      <!-- Content Container -->
      <main class="flex-1 w-full p-6 max-w-[1600px] mx-auto flex flex-col gap-4 overflow-hidden">
        
        <div class="flex items-end justify-between px-2">
           <h3 class="text-lg font-black text-slate-900 tracking-tight">Active Accounts</h3>
           <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ mockUsers.length }} Profiles Found</p>
        </div>

        <div class="flex-1 bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
           <div class="overflow-y-auto flex-1 custom-scrollbar">
              <table class="w-full text-left border-collapse">
                 <thead class="sticky top-0 z-20 bg-slate-50">
                    <tr class="border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                       <th class="px-6 py-4">User Identity</th>
                       <th class="px-6 py-4">Account Role</th>
                       <th class="px-6 py-4">Account Status</th>
                       <th class="px-6 py-4 text-right">Administrative Actions</th>
                    </tr>
                 </thead>
                 <tbody class="divide-y divide-slate-50">
                    <tr v-for="user in mockUsers" :key="user.id" class="hover:bg-slate-50 transition-colors group cursor-default">
                       <td class="px-6 py-3 flex items-center gap-3">
                          <div class="w-9 h-9 rounded-xl bg-slate-100 overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
                             <img :src="user.avatar" class="w-full h-full object-cover" />
                          </div>
                          <div class="min-w-0">
                             <p class="font-black text-slate-900 text-xs tracking-tight truncate">{{ user.name }}</p>
                             <p class="text-[9px] font-bold text-slate-400 lowercase truncate">{{ user.email }}</p>
                          </div>
                       </td>
                       <td class="px-6 py-3">
                          <span :class="roleClass(user.role)" class="px-2.5 py-1 rounded-lg font-black text-[8px] uppercase tracking-widest border border-current opacity-70">
                             {{ user.role }}
                          </span>
                       </td>
                       <td class="px-6 py-3">
                          <div class="flex items-center gap-2">
                             <div :class="['w-1 h-1 rounded-full', user.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500']"></div>
                             <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest">{{ user.status }}</span>
                          </div>
                       </td>
                       <td class="px-6 py-3 text-right">
                          <div class="flex justify-end gap-2">
                             <button class="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                                <i class="fas fa-edit text-[9px]"></i>
                             </button>
                             <button class="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white transition-all">
                                <i class="fas fa-trash text-[9px]"></i>
                             </button>
                          </div>
                       </td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </div>
      </main>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import AdminSidebar from '@/components/admin/AdminSidebar.vue';
import { getPersonPlaceholder } from '@/utils/placeholders';

const mockUsers = ref([
  { id: 1, name: 'John Doe', email: 'john@foodlink.io', role: 'Customer', status: 'Active', avatar: getPersonPlaceholder('John Doe') },
  { id: 2, name: 'Alice Smith', email: 'alice@merchant.com', role: 'Merchant', status: 'Active', avatar: getPersonPlaceholder('Alice Smith') },
  { id: 3, name: 'Mike Johnson', email: 'mike.j@rider.app', role: 'Rider', status: 'Active', avatar: getPersonPlaceholder('Mike Johnson') },
  { id: 4, name: 'Sarah Williams', email: 'sarah.w@foodlink.io', role: 'Customer', status: 'Suspended', avatar: getPersonPlaceholder('Sarah Williams') },
  { id: 5, name: 'David Lee', email: 'david@cuisine.com', role: 'Merchant', status: 'Active', avatar: getPersonPlaceholder('David Lee') },
  { id: 6, name: 'Emma Wilson', email: 'emma@foodlink.io', role: 'Customer', status: 'Active', avatar: getPersonPlaceholder('Emma Wilson') },
  { id: 7, name: 'James Bond', icon: 'fa-user', email: 'james@rider.app', role: 'Rider', status: 'Active', avatar: getPersonPlaceholder('James Bond') },
  { id: 8, name: 'Linda Chen', email: 'linda@sushi.com', role: 'Merchant', status: 'Active', avatar: getPersonPlaceholder('Linda Chen') }
]);

const roleClass = (role) => {
  switch (role) {
    case 'Customer': return 'text-primary';
    case 'Merchant': return 'text-slate-900';
    case 'Rider': return 'text-emerald-500';
    default: return 'text-slate-400';
  }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #E2E8F0;
  border-radius: 10px;
}
</style>
