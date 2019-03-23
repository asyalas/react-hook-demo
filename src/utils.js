import { useEffect, useRef, useState ,useCallback} from "react";

/**
 * 生命周期 componentWillUnmount
 * @param fn
 */
export const useWillUnmount = fn =>
  useEffect(() => {
    return () => fn && fn();
  }, []);

/**
 * 生命周期 componentDidMount
 * @param fn
 */
export const useDidMount = fn =>
  useEffect(() => {
    if (!!fn) {
      fn();
    }
  }, []);

/**
 * 生命周期 componentDidUpdate
 * @param fn
 */

export const useDidUpdate = fn => {
  const mounting = useRef(true);
  useEffect(() => {
    if (mounting.current) {
      mounting.current = false;
    } else {
      fn();
    }
  });
};

/**
 * 强制更新 forceUpdate
 */
export const useForceUpdate = () => {
  const [, forceUpdate] = useState(0);
  return ()=>forceUpdate(Math.random());
};

/**
 * input的onchange事件
 * @param {*} initial 
 */
export const useInputState = (initial) => {
  const [value, setValue] = useState(initial);
  const onChange =useCallback( (e) => setValue(e.target.value.trim()),[]);
  return [value, onChange, setValue];
};

/**
 * 获取更新前的值
 * @param {*} value 
 */
export const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};