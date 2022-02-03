import { useEffect, useState } from 'react';

export default function useVerifyStatus(id, url) {
  const [status, setStatus] = useState();

  useEffect(() => {
    const verifyStatus = (id2) => {
      const arrListSteps = localStorage.inProgressRecipes;
      const index = url.includes('food') ? 0 : 1;
      // console.log(entriesArr);
      if (!arrListSteps || id2.length < +'3') {
        setStatus(false);
      } else {
        const entriesArr = Object.entries(JSON.parse(arrListSteps));
        const entriesRecipes = Object.keys(entriesArr[index][1]);
        const existId = entriesRecipes.some((el) => el === id2);
        // console.log(existId);
        setStatus(existId);
      }
    };
    verifyStatus(id);
  }, [id, url]);

  return [status];
}
