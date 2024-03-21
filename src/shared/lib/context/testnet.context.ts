import { createContext } from "react";

type TestNetContextType = {
  testNet: boolean;
  setTestNet: React.Dispatch<React.SetStateAction<boolean>>;
};

const TestNetContextState = {
  testNet: false,
  setTestNet: () => {},
};

const TestNetContext = createContext<TestNetContextType>(TestNetContextState);

export default TestNetContext;
