import {useState} from "react";
import classes from './counter.module.scss';

export const Counter = () => {
    const [count, setCount] = useState<number>(0)

    return <div>
        <button className={classes.button} onClick={() => setCount(count => count + 1)}>+</button>
        {count}
        <button className={classes.button} onClick={() => setCount(count => count - 1)}>-</button>
    </div>
}