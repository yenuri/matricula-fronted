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

function removeOrderEntry(state, order) {
        const { [order.id]: toRemove, ...remainingOrders } = state.orders
        return {
            ...state,
            orders: remainingOrders,
        }
    return {
        ...state,
        orders: { ...state.orders},
    }
}

function addOrderEntry( state, course) {
    const existingEntry = state.orders[course.id]
    if (existingEntry) {
        const newEntry = { ...existingEntry }
        return {
            ...state,
            orders: { ...state.orders, [newEntry.id]: newEntry },
        }
    }

    const newEntry = {
        id: course.id,
        name: course.name,
        birthday: Date.now()
    }

    return {
        ...state,
        orders: { ...state.orders, [newEntry.id]: newEntry },
    }
}

function updateDescription(state, description) {
    return {
        ...state,
        description,
    }
}

function updateObservation(state, observation) {
    return {
        ...state,
        observation,
    }
}

function resetState() {
    return getInitialState()
}

function resetOrders(state) {
    return {
        ...state,
        orders: {},
    }
}

export function getInitialState() {
    return { orders: {} }
}

export function fireAction(type, payload = undefined) {
    return { type, payload }
}
