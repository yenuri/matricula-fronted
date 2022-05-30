import { useEffect, useState } from 'react'
import httpClient from '../services/httpClient'
import { matriculasUrl } from '../constants/serviceUrls'

interface UseCreateMatriculaReturnType {
    updateInProgress: boolean
    updateResult: any
    updateError: Error | undefined
    createMatricula: (matriculaData: any) => Promise<void>
}
export const useCreateMatricula = (): UseCreateMatriculaReturnType => {
    const [updateInProgress, setUpdateInProgress] = useState(false)
    const [updateResult, setUpdateResult] = useState()
    const [updateError, setUpdateError] = useState<Error>()

    useEffect(() => {
        if (updateError) {
            setUpdateResult(undefined)
        }
    }, [updateError])

    useEffect(() => {
        if (updateResult) {
            setUpdateError(undefined)
        }
    }, [updateResult])

    const createMatricula = async (matriculaDate: any) => {
        setUpdateInProgress(true)
        try {
            const response = await httpClient.post(matriculasUrl, matriculaDate)
            setUpdateResult(response)
        } catch (e) {
            setUpdateError(e as Error)
        }
        setUpdateInProgress(false)
    }

    return { updateInProgress, updateResult, updateError, createMatricula }
}
