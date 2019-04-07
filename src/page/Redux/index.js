import React, { useState as useReactState, useRef, useEffect } from "react";
import { Modal, Button, Input, Checkbox } from "antd";
import { createStore, combineReducers } from "redux";
import { Provider, connect } from "react-redux";
import { fromJS, is } from "immutable";
const deepCompare = (obj1, obj2) => is(fromJS(obj1), fromJS(obj2));
const isChange = (obj1, obj2, tag) => {
  const bol = deepCompare(obj1, obj2);
  return bol ? ++tag : tag;
};
const useState = inital => {
  const [value, setValue] = useReactState(inital);
  const ref = useRef({});
  const tag = isChange(inital, ref.current.inital);
  useEffect(() => {
    ref.current = {
      tag,
      inital
    };
  });
  useEffect(() => {
    setValue(inital);
  }, [tag]);
  return [value, setValue];
};
const CheckboxGroup = Checkbox.Group;
const UI = props => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "300px",
      margin: "20px auto"
    }}
  >
    {props.children}
  </div>
);
//这是redux的原始state
const tiger = {
  num: 0,
  name: "",
  checkBox: []
};

const increase = "increase";
const init = "init";

//这是reducer
const reducer = (state = tiger, action) => {
  switch (action.type) {
    case increase:
      return {
        ...state,
        ...action.data
      };
    case init:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
};

const ReduxView = props => {
  const [name, setName] = useState(props.name);
  const [value, setvalue] = useState(props.checkBox);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  console.log("render", props);
  useEffect(() => {
    new Promise((s, r) => {
      setTimeout(() => {
        s({
          num: 2,
          name: "拉下来的数据",
          checkBox: [1, 2]
        });
      }, 1500);
    }).then(res => {
      props.dispatch({
        type: init,
        data: res
      });
    });
  }, []);
  const options = [
    {
      value: 1,
      label: "复选框1"
    },
    {
      value: 2,
      label: "复选框2"
    },
    {
      value: 3,
      label: "复选框3"
    }
  ];

  const increaseHandle = () => {
    props.dispatch({
      type: increase,
      data: {
        num: props.num + 1
      }
    });
  };
  const submit = () => {
    console.log({
      name,
      value,
      num: props.num
    });
  };
  const hideModal = () => setVisible(false);
  const openModal = data => {
    setVisible(true);
    setData(data);
  };
  return (
    <div>
      <UI>
        <Input value={name} onChange={e => setName(e.target.value)} />
      </UI>
      <UI>
        <CheckboxGroup options={options} value={value} onChange={setvalue} />
      </UI>
      <UI>
        <div
          style={{
            marginRight: "15px"
          }}
        >
          num:{props.num}
        </div>
        <Button type="primary" onClick={increaseHandle}>
          点击增加
        </Button>
      </UI>
      <UI>
        <Button onClick={() => openModal({ name: "模态框1" })} type="primary">
          打开模态框1
        </Button>
        <Button onClick={() => openModal({ name: "模态框2" })} type="primary">
          打开模态框2
        </Button>
        <CustomModal
          onCancel={hideModal}
          data={data}
          visible={visible}
          setData={setData}
        />
      </UI>
      <UI>
        <Button onClick={submit} type="primary">
          提交
        </Button>
      </UI>
    </div>
  );
};
const CustomModal = props => {
  return (
    <Modal title="模态框" onCancel={props.onCancel} visible={props.visible}>
      <div>我的名字是：</div>
      <Input
        value={props.data.name}
        onChange={e =>
          props.setData({
            ...props.data.name,
            name: e.target.value
          })
        }
      />
    </Modal>
  );
};
const ReduxWrap = connect(store => {
  return store.root;
})(ReduxView);

//创建store
const store = createStore(
  combineReducers({
    root: reducer
  })
);

const reduxDemo = () => (
  <Provider store={store}>
    <ReduxWrap />
  </Provider>
);
export default reduxDemo;
