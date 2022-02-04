import { useEffect, useState } from 'react';

export default function useDone(id3) {
  const [done2, setdone2] = useState();

  useEffect(() => {
    const verifyDone = (id2) => {
      const arrListDone = localStorage.doneRecipes;
      if (!arrListDone || id2.length < +'3') {
        setdone2(false);
      } else {
        const entriesArr = JSON.parse(arrListDone);
        const existId = entriesArr.some(({ id }) => id === id2);
        setdone2(existId);
      }
    };
    verifyDone(id3);
  }, [id3]);

  return [done2];
}
