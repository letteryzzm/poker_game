import { useState, useCallback } from 'react';
import type { ResourceCard } from '@/types';

interface DragState {
  isDragging: boolean;
  draggedCard: ResourceCard | null;
  draggedFrom: string | null;
  position: { x: number; y: number };
}

export function useDragDrop() {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedCard: null,
    draggedFrom: null,
    position: { x: 0, y: 0 }
  });

  const startDrag = useCallback((
    card: ResourceCard,
    fromDeck: string,
    event: React.MouseEvent
  ) => {
    setDragState({
      isDragging: true,
      draggedCard: card,
      draggedFrom: fromDeck,
      position: { x: event.clientX, y: event.clientY }
    });
  }, []);

  const updateDragPosition = useCallback((event: React.MouseEvent) => {
    if (dragState.isDragging) {
      setDragState(prev => ({
        ...prev,
        position: { x: event.clientX, y: event.clientY }
      }));
    }
  }, [dragState.isDragging]);

  const endDrag = useCallback(() => {
    setDragState({
      isDragging: false,
      draggedCard: null,
      draggedFrom: null,
      position: { x: 0, y: 0 }
    });
  }, []);

  return { dragState, startDrag, updateDragPosition, endDrag };
}
