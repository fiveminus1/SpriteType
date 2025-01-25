"use client";

import {useState, useEffect, useCallback} from 'react';

interface Word{
    _id: string;
    word: string;
}

export default function useRandomWords(limit=10){
    const [words, setWords] = useState<Word[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const fetchWords = useCallback(async () => {
        try{
            setLoading(true);
            const response = await fetch(`/api/words?limit=${limit}`);
            if(!response.ok){
                throw new Error('Failed to fetch words');
            }
            const data = await response.json();
            setWords(data);
            setError(null);
        }
        catch(error){
            if(error instanceof Error){
                setError(error.message);
            } 
            else{
                setError("unknown error");
            }
        }
        finally{
            setLoading(false);
        }
    }, [limit]);

    useEffect(() => {
        fetchWords();
    }, [fetchWords]);

    const resetWords = useCallback(() => {
        fetchWords();
    }, [fetchWords]);

    return {words, loading, error, resetWords};
}