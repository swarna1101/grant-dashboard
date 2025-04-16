import { create } from 'zustand'
import { ProjectType } from '../types'

interface BearState {
    projects: ProjectType[]
    isLoading:boolean
  setProjects: (_projects: ProjectType[]) => void
}

export const useProjectStore = create<BearState>()((set) => ({
    projects: [],
    isLoading:true,
    setProjects: (_projects: ProjectType[]) => set((state) => ({
        ...state,
        projects: _projects,
        isLoading:false
   })),
}))