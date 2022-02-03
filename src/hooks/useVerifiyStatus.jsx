import { useEffect, useState } from 'react';

export default function useVerifyStatus(id) {
  const [status, setStatus] = useState();

  useEffect(() => {
    const verifyStatus = (id2) => {
      const arrListSteps = localStorage.recipesInprogress;
      if (!arrListSteps || id2.length < +'3') {
        setStatus(false);
      } else {
        const entriesArr = Object.entries(JSON.parse(arrListSteps));
        const existId = entriesArr.some((el) => el[0] === id2);
        setStatus(existId);
      }
    };
    verifyStatus(id);
  }, [id]);

  return [status];
}
