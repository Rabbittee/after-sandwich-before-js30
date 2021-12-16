import { useEffect, useState,useCallback } from 'react'
import {queryCwb} from "../api/api"

export function useWeatherAPI(path,body){
  const [series,setSeries] = useState(null);
  const api = useCallback(async()=>{
    const result = await queryCwb(path, body);
    setSeries(result.records)
  },[]);
  useEffect(api,[api])
  return series
}
