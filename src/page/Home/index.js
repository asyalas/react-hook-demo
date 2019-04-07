import logo from "./logo.svg";
import "./App.css";
import { Input, Button } from "antd";
import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  useRef,
  memo
} from "react";

import {
  useForceUpdate,
  useDidUpdate,
  useDidMount,
  useWillUnmount,
  useInputState,
  usePrevious
} from "../../utils";
const { Group } = Button;

const ThemeContext = React.createContext({
  background: "#282c34",
  color: "#61dafb"
});

/**
 * 监控浏览器变化
 * @return {number} innerWidth 返回当前窗口宽度
 * **/
const useWindowWith = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const handleResize = () => setInnerWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return innerWidth;
};

/**
 * 计数
 * @param  {number} initialState 初始值
 * @return {number} count 值
 * @return {function} setCount 改变值的方法
 * */
const useCount = initialState => {
  const [count, setCount] = useState(initialState);
  useEffect(() => {}, [count]);
  return [count, setCount];
};

/**
 * count-reducer
 * * */

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return initialState;
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

/**
 * 点击获取焦点
 * @param  {number} initial 初始值
 * @return {object} ref 当前的ref对象
 * @return {function} focusHandle 使用该ref对象的函数
 * */
function useRefHandle(initial) {
  let ref = useRef(initial);
  let focusHandle = () => ref.current.focus();
  return [ref, focusHandle];
}

const ChildComponent = memo(props => {
  console.log("child component render");
  return <p>我是子组件,父组件传下来的值为：{props.value}</p>;
});
const App = props => {
  const innerWidth = useWindowWith();
  const [count, setCount] = useCount(0);
  const { color, background } = useContext(ThemeContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  let [inputEl, focusHandle] = useRefHandle(null);
  const [value, onChange] = useInputState(undefined);
  const preonChange = usePrevious(onChange);

  console.log(
    "------- 在更新的时候onChange是否重新生成 start ----------------"
  );
  console.log("onChange", onChange === preonChange);
  // 结论：在更新的时候onChange都会重新生成，所以需要用到useCallback对其进行memoize
  // 可以在utils里面去掉useInputState的useCallback方法去实验
  console.log("------- 在更新的时候onChange是否重新生成 end ----------------");
  console.log("render number");

  useDidUpdate(() => {
    console.log("didUpdate");
  });
  useDidMount(() => {
    console.log("didMount");
  });

  useWillUnmount(() => {
    console.log("willUnmount");
  });

  return (
    <div className="App">
      {/* useContext demo */}
      <header className="App-header" style={{ backgroundColor: background }}>
        <img src={logo} className="App-logo" alt="logo" />
        <p> react hook demo </p>
        {/* forceUpdate */}
        <Button onClick={useForceUpdate()} type="primary">
          强制更新
        </Button>
        {/* useState demo */}
        <p>count:{count}</p>
        <Button onClick={() => setCount(count + 1)} type="primary">
          点击
        </Button>

        {/* useReducer demo */}
        <p>reducer count:{state.count}</p>
        <Group>
          <Button
            type="primary"
            onClick={() => dispatch({ type: "increment" })}
          >
            increment
          </Button>
          <Button
            type="primary"
            onClick={() => dispatch({ type: "decrement" })}
          >
            decrement
          </Button>
          <Button type="primary" onClick={() => dispatch({ type: "reset" })}>
            reset
          </Button>
        </Group>

        {/* useEffect demo */}
        <p>当前屏幕宽度：{innerWidth}</p>

        {/* useRef demo */}
        <p>
          useRef:{" "}
          <Input type="text" ref={inputEl} onChange={onChange} value={value} />
          <Button type="primary" onClick={focusHandle}>
            聚焦
          </Button>
        </p>
        {/* memo */}
        <ChildComponent value={value} />
        {/* useContext demo */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: color }}
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

// export default useHooks(App)
export default App;
