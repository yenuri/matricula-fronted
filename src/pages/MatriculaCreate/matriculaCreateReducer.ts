export const MatriculaCreateAction = {
    updateDescription: 'updateDescription',
    updateObservation: 'updateObservation',
    addOrderEntry: 'addOrderEntry',
    removeOrderEntry: 'removeOrderEntry',
    resetState: 'resetState',
    resetOrders: 'resetOrders',
}

interface Action {
    type: String
    payload: any
}

export const matriculaCreateReducer = (state: any, action: Action) => {
    const { type, payload } = action

    switch (type) {
        case MatriculaCreateAction.updateDescription:
            return updateDescription(state, payload)
        case MatriculaCreateAction.updateObservation:
            return updateObservation(state, payload)
        case MatriculaCreateAction.addOrderEntry:
            return addOrderEntry(state, payload)
        case MatriculaCreateAction.removeOrderEntry:
            return removeOrderEntry(state, payload)
        case MatriculaCreateAction.resetState:
            return resetState()
        case MatriculaCreateAction.resetOrders:
            return resetOrders(state)
    }
}

function removeOrderEntry(
    state: { orders: { [x: string]: any } },
    order: { id: string | number }
) {
    const existingEntry = { ...state.orders[order.id] }
    existingEntry.quantity -= 1
    if (existingEntry.quantity === 0) {
        const { [order.id]: toRemove, ...remainingOrders } = state.orders
        return {
            ...state,
            orders: remainingOrders,
        }
    }
    return {
        ...state,
        orders: { ...state.orders, [existingEntry.id]: existingEntry },
    }
}

function addOrderEntry(
    state: { orders: { [x: string]: any } },
    course: { id: string | number; name: any }
) {
    const existingEntry = state.orders[course.id]
    if (existingEntry) {
        const newEntry = { ...existingEntry }
        newEntry.quantity += 1
        return {
            ...state,
            orders: { ...state.orders, [newEntry.id]: newEntry },
        }
    }

    const newEntry = {
        id: course.id,
        quantity: 1,
        nombre: course.name,
    }

    return {
        ...state,
        orders: { ...state.orders, [newEntry.id]: newEntry },
    }
}

function updateDescription(state: any, description: any) {
    return {
        ...state,
        description,
    }
}

function updateObservation(state: any, observation: any) {
    return {
        ...state,
        observation,
    }
}

function resetState() {
    return getInitialState()
}

function resetOrders(state: any) {
    return {
        ...state,
        orders: {},
    }
}

export function getInitialState() {
    return { observation: '', description: '', orders: {} }
}

export function fireAction(type: any, payload = undefined) {
    return { type, payload }
}
