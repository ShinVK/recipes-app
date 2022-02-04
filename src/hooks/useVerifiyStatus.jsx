import { useEffect, useState } from 'react';

export default function useVerifyStatus(id, url) {
  const [status, setStatus] = useState();

  useEffect(() => {
    const verifyStatus = (id2) => {
      const arrListSteps = localStorage.inProgressRecipes;
      const index = url.includes('food') ? 'meals' : 'cocktails';
      if (!arrListSteps || id2.length < +'3') {
        setStatus(false);
      } else {
        const entriesArr = Object.entries(JSON.parse(arrListSteps));
        const filterEl = entriesArr.filter((el2) => el2[0] === index);
        // console.log(filterEl);
        if (filterEl.length === 0) { setStatus(false); console.log('rodei'); } else {
          // console.log(Object.entries(filterEl[0][1]));
          const entriesRecipes = Object.keys(filterEl[0][1]);
          const existId = entriesRecipes.some((el) => el === id2);
          // console.log(entriesRecipes);
          setStatus(existId);
        }
      }
    };
    verifyStatus(id);
  }, [id, url]);

  return [status];
}
