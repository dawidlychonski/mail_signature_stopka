// src/context/SignatureContext.jsx
import { createContext, useContext, useState } from 'react';

const SignatureContext = createContext();

export const useSignature = () => useContext(SignatureContext);

export const SignatureProvider = ({ children }) => {
  const [signatureData, setSignatureData] = useState(null);
  return (
    <SignatureContext.Provider value={{ signatureData, setSignatureData }}>
      {children}
    </SignatureContext.Provider>
  );
};
