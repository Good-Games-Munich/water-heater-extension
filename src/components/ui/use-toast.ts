// Inspired by react-hot-toast library
import type { ToastActionElement, ToastProps } from '@/components/ui/toast';
import * as React from 'react';

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1_000_000;

type ToasterToast = ToastProps & {
    action?: ToastActionElement;
    description?: React.ReactNode;
    id: string;
    title?: React.ReactNode;
};

const actionTypes = {
    ADD_TOAST: 'ADD_TOAST',
    UPDATE_TOAST: 'UPDATE_TOAST',
    DISMISS_TOAST: 'DISMISS_TOAST',
    REMOVE_TOAST: 'REMOVE_TOAST',
} as const;

let count = 0;

const genId = () => {
    count = (count + 1) % Number.MAX_SAFE_INTEGER;
    return count.toString();
};

type ActionType = typeof actionTypes;

type Action =
    | {
          toast: ToasterToast;
          type: ActionType['ADD_TOAST'];
      }
    | {
          toast: Partial<ToasterToast>;
          type: ActionType['UPDATE_TOAST'];
      }
    | {
          toastId?: ToasterToast['id'];
          type: ActionType['DISMISS_TOAST'];
      }
    | {
          toastId?: ToasterToast['id'];
          type: ActionType['REMOVE_TOAST'];
      };

interface State {
    toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
    if (toastTimeouts.has(toastId)) {
        return;
    }

    const timeout = setTimeout(() => {
        toastTimeouts.delete(toastId);
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        dispatch({
            type: 'REMOVE_TOAST',
            toastId,
        });
    }, TOAST_REMOVE_DELAY);

    toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ADD_TOAST':
            return {
                ...state,
                toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
            };

        case 'UPDATE_TOAST':
            return {
                ...state,
                toasts: state.toasts.map(t =>
                    t.id === action.toast.id ? { ...t, ...action.toast } : t,
                ),
            };

        case 'DISMISS_TOAST': {
            const { toastId } = action;

            // ! Side effects ! - This could be extracted into a dismissToast() action,
            // but I'll keep it here for simplicity
            if (toastId) {
                addToRemoveQueue(toastId);
            } else {
                state.toasts.forEach(toRemoveToast => {
                    addToRemoveQueue(toRemoveToast.id);
                });
            }

            return {
                ...state,
                toasts: state.toasts.map(t =>
                    t.id === toastId || toastId === undefined
                        ? {
                              ...t,
                              open: false,
                          }
                        : t,
                ),
            };
        }

        case 'REMOVE_TOAST':
            if (action.toastId === undefined) {
                return {
                    ...state,
                    toasts: [],
                };
            }

            return {
                ...state,
                toasts: state.toasts.filter(t => t.id !== action.toastId),
            };
        default:
            return state;
    }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

const dispatch = (action: Action) => {
    memoryState = reducer(memoryState, action);
    listeners.forEach(listener => {
        listener(memoryState);
    });
};

type Toast = Omit<ToasterToast, 'id'>;

const toast = ({ ...toastProps }: Toast) => {
    const id = genId();

    const update = (toasterToastProps: ToasterToast) =>
        dispatch({
            type: 'UPDATE_TOAST',
            toast: { ...toasterToastProps, id },
        });
    const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id });

    dispatch({
        type: 'ADD_TOAST',
        toast: {
            ...toastProps,
            id,
            open: true,
            onOpenChange: open => {
                if (!open) dismiss();
            },
        },
    });

    return {
        id,
        dismiss,
        update,
    };
};

const useToast = () => {
    const [state, setState] = React.useState<State>(memoryState);

    React.useEffect(() => {
        listeners.push(setState);
        return () => {
            const index = listeners.indexOf(setState);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }, [state]);

    return {
        ...state,
        toast,
        dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
    };
};

export { toast, useToast };
