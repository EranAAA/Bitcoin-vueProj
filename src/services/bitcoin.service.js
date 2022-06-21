'use strict'
import axios from 'axios'

import { storageService } from '@/services/storage.service.js'

const bitcoinRateKEY = 'bitcoinRate'
const bitcoinTradeVolumeKEY = 'bitcoinTradeVolume'
const bitcoinAverageBlockSizeKEY = 'bitcoinAverageBlockSize'
const bitcoinMarketPriceKEY = 'bitcoinMarketPrice'

export const bitcoinService = {
   getRate,
   getTradeVolume,
   getAverageBlockSize,
   getMarketPrice
}

async function getRate(coins = 1) {
   // var collection = storageService.load(bitcoinRateKEY)
   // if (!collection) {
      try {
         const res = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`);
         console.log('getRate from axios');
         storageService.save(bitcoinRateKEY, res.data)
         return res.data
      } catch (error) {
         console.error(error);
      }
   // } 
   // else {
   //    console.log('getRate from DB');
   //    return collection
   // }
}

async function getTradeVolume() {
   var collection = storageService.load(bitcoinTradeVolumeKEY)
   if (!collection) {
      try {
         const res = await axios.get(`https://api.blockchain.info/charts/trade-volume?timespan=2months&format=json&cors=true#`);
         console.log('getTradeVolume from axios');
         storageService.save(bitcoinTradeVolumeKEY, res.data)
         return res.data
      } catch (error) {
         console.error(error);
      }
   } else {
      console.log('getTradeVolume from DB');
      return collection
   }
}

async function getAverageBlockSize() {
   var collection = storageService.load(bitcoinAverageBlockSizeKEY)
   if (!collection) {
      try {
         const res = await axios.get(`https://api.blockchain.info/charts/avg-block-size?timespan=2months&format=json&cors=true`);
         console.log('getAverageBlockSize from axios');
         storageService.save(bitcoinAverageBlockSizeKEY, res.data)
         return res.data
      } catch (error) {
         console.error(error);
      }
   } else {
      console.log('getAverageBlockSize from DB');
      return collection
   }
}

async function getMarketPrice() {
   var collection = storageService.load(bitcoinMarketPriceKEY)
   if (!collection) {
   try {
      const res = await axios.get(`https://api.blockchain.info/charts/market-price?timespan=2months&format=json&cors=true`);
      console.log('getMarketPrice from axios');
      storageService.save(bitcoinMarketPriceKEY, res.data)
      return res.data
   } catch (error) {
      console.error(error);
   }
} else {
   console.log('getMarketPrice from DB');
   return collection
}
}