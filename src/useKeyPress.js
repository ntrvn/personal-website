import {useState} from 'react';
import useEventListener from '@use-it/event-listener';

const useKeyPress = () => {
    const [key, setKey] = useState("");
    useEventListener('keyup', event => {
        setKey(event.key);
    })
    return key;
}

export default useKeyPress;