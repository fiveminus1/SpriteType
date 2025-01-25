"use client";

import {useState, useEffect} from 'react';

interface Word{
    _id: string;
    word: string;
}

export default function useRandomWords(limit=10){
    const [words, setWords] = useState<Word[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetch(`/api/words?limit=${limit}`)
        .then((response) => {
            if(!response.ok){
                throw new Error('Failed to fetch words');
            }
            return response.json();
        })
        .then((data) => {
            setWords(data);
            setLoading(false);
        })
        .catch((error) => {
            setError(error.message);
            setLoading(false);
        });
    }, [limit]);

    return {words, loading, error};
}