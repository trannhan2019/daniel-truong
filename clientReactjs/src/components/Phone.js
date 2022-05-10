import { useContext } from 'react';
import { CompanyContext } from './Company';

const Phone = () => {
  const company = useContext(CompanyContext);
  return (
    <>
      <h5>This Product is Iphone</h5>
      <p>It is Product's {company}</p>
    </>
  );
};

export default Phone;
