import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as eventsService from '@/services/events'
import type { EventFormData } from '@/types'

export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: eventsService.fetchEvents,
    refetchInterval: 5000,
  })
}

export function useEvent(id: string) {
  return useQuery({
    queryKey: ['events', id],
    queryFn: () => eventsService.fetchEvent(id),
    enabled: !!id,
    refetchInterval: 5000,
  })
}

export function useCreateEvent() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: EventFormData) => eventsService.createEvent(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events'] }),
  })
}

export function useUpdateEvent() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<EventFormData & { featured: boolean }> }) =>
      eventsService.updateEvent(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events'] }),
  })
}

export function useDeleteEvent() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => eventsService.deleteEvent(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events'] }),
  })
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: eventsService.fetchDashboardStats,
    refetchInterval: 5000,
  })
}

export function useSetFeatured() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string | null) => eventsService.setFeaturedEvent(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['events'] })
      qc.invalidateQueries({ queryKey: ['dashboard-stats'] })
    },
  })
}
