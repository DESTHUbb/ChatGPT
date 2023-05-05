import { useState, useEffect } from 'react';
import { v4 } from 'uuid';

export const safeKey = Symbol('chat-id');

export default function useData(oData: any[]) {
  const [opData, setData] = useState<any[]>([]);

  useEffect(() => {
    opInit(oData);
  }, []);

  const opAdd = (val: any) => {
    const v = [val, ...opData];
    setData(v);
    return v;
  };

  const opInit = (val: any[] = []) => {
    if (!val || !Array.isArray(val)) return;
    const nData = val.map((i) => ({ [safeKey]: v4(), ...i }));
    setData(nData);
  };

  const opRemove = (id: string) => {
    const nData = opData.filter((i) => i[safeKey] !== id);
    setData(nData);
    return nData;
  };

  const opRemoveItems = (ids: string[]) => {
    const nData = opData.filter((i) => !ids.includes(i[safeKey]));
    setData(nData);
    return nData;
  };

  const opReplace = (id: string, data: any) => {
    const nData = [...opData];
    const idx = opData.findIndex((v) => v[safeKey] === id);
    nData[idx] = data;
    setData(nData);
    return nData;
  };

  const opReplaceItems = (ids: string[], data: any) => {
    const nData = [...opData];
    let count = 0;
    for (let i = 0; i < nData.length; i++) {
      const v = nData[i];
      if (ids.includes(v[safeKey])) {
        count++;
        nData[i] = { ...v, ...data };
      }
      if (count === ids.length) break;
    }
    setData(nData);
    return nData;
  };

  return {
    opSafeKey: safeKey,
    opInit,
    opReplace,
    opAdd,
    opRemove,
    opRemoveItems,
    opData,
    opReplaceItems,
  };
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

# IMPROVED CODE:

import { useState, useEffect, useMemo } from 'react' ;
import { v4 as uuidv4 } from 'uuid';

type ObjectWithSafeKey = Record<string, any> & { [safeKey]: string };

export const safeKey = Symbol('chat-id');

export default function useData<T extends ObjectWithSafeKey>(initialData: T[] = []) {

const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    init(initialData);
  }, []);
  
  const init = (newData: T[]) => {
    const updatedData = newData.map((i) => ({ [safeKey]: uuidv4(), ...i }));
    setData(updatedData);
  };
  
  const add = (newItem: T) => {
   const updateData = [newItem, ...data];
    setData(updatedData);
    return updatedData;
  };
  
   const remove = (id: string) => {
    const updatedData = data.filter((item) => item[safeKey] !== id);
     
         setData(updatedData);
    return updatedData;
  };

   const removeItems = (ids: string[]) => {
    const updatedData = data.filter((item) => !ids.includes(item[safeKey]));
    
   setData(updatedData);
    return updatedData;
  };
  
  const replace = (id: string, newItem: T) => {
    const updatedData = [...data];
    const index = updatedData.findIndex((item) => item[safeKey] === id);
    
    if (index !== -1) {
      updatedData[index] = { ...newItem, [safeKey]: id };
      setData(updatedData);
    }
    
     return updatedData;
  };
  
  const replaceItems = (ids: string[], newItem: Partial<T>) => {
    const updatedData = [...data];
    let count = 0;
    for (let i = 0; i < updatedData.length; i++) {
      if (ids.includes(updatedData[i][safeKey])) {
        updatedData[i] = { ...updatedData[i], ...newItem };
        count++;
        if (count === ids.length) break;
         }
    }
    setData(updatedData);
    return updatedData;
    };
  
    const memoizedData = useMemo(() => data, [data]);

  return {
    safeKey,
    init,
    add,
    remove,
    removeItems,
    replace,
    replaceItems,
    data: memoizedData,
  };
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
# The changes made to the code are as follows:

1: Added a generic type to specify the type of object to use in the list.

2



