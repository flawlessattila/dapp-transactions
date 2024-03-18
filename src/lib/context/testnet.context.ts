import { createContext } from "react";

type TestNetContextType = {
  testNet: boolean | null,
  setTestNet: React.Dispatch<React.SetStateAction<boolean | null>>
}

const TestNetContextState = {
  testNet: null,
  setTestNet: () => {}
}

const TestNetContext = createContext<TestNetContextType>(TestNetContextState);

export default TestNetContext;

