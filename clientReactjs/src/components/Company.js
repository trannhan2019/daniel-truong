import { useState, createContext } from 'react';
import Product from './Product';

export const CompanyContext = createContext();

const Company = () => {
  const [company, setCompany] = useState('Apple');
  return (
    <CompanyContext.Provider value={company}>
      <h3>This is Product page</h3>
      <Product />
    </CompanyContext.Provider>
  );
};

export default Company;
