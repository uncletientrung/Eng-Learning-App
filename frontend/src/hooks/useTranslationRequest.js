import { useEffect, useState } from "react";

export default function useTranslationRequest(loader) {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        loader(controller.signal)
            .then((result) => {
                if (!controller.signal.aborted) setData(result);
            })
            .catch((requestError) => {
                if (!controller.signal.aborted) setError(requestError.message);
            });
        return () => controller.abort();
    }, [loader, attempt]);

    const retry = () => {
        setData(null);
        setError("");
        setAttempt((value) => value + 1);
    };

    return { data, error, retry };
}
