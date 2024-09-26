"use client"

import { getDataLalin } from "@/app/api/dashboard"
import Pagination from "@/components/pagination"
import Table from "@/components/table"
import { getDateFromDate, getDayFromDate } from "@/utils/dateUtils"
import { mdiMagnify, mdiPlusBoxOutline } from "@mdi/js"
import Icon from "@mdi/react"
import { useEffect, useState } from "react"

export default function LaporanHarian() {
  interface DataRow {
    'No.': number
    Ruas: string
    Gerbang: string
    Gardu: string
    Hari: string
    Tanggal: string
    'Metode Pembayaran': string
    'Gol I': number
    'Gol II': number
    'Gol III': number
    'Gol IV': number
    'Gol V': number
    'Total Lalin': number
  }

  const listRows = [5, 25, 50, 100]
  const [detailData, setDetailData] = useState<{ 
    total_pages: number
    current_pages: number 
  }>({
    total_pages: 0,
    current_pages: 0
  })
  const [data, setData] = useState<DataRow[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const date = '2023-11-01'

    try {
      const response = await getDataLalin(date)
      if (response.code === 200) {
        const newData: DataRow[] = response.data.rows.rows.map((item: any, index: number) => ({
         'No.': index + 1,
          Ruas: item.IdCabang,
          Gerbang: item.IdGerbang, 
          Gardu: item.IdGardu,
          Hari: getDayFromDate(item.Tanggal),
          Tanggal: getDateFromDate(item.Tanggal),
          'Metode Pembayaran': item.eBri,
          'Gol I': item.Golongan,
          'Gol II': item.Golongan,
          'Gol III': item.Golongan,
          'Gol IV': item.Golongan,
          'Gol V': item.Golongan,
          'Total Lalin': item.Golongan,
        }))

        setData(newData)
        setDetailData({
          total_pages: response.data.total_pages,
          current_pages: response.data.current_page
        })
      }
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  

  return (
    <div className="flex p-4 bg-gray-200 min-h-full">
      <div className="flex flex-col bg-white text-black w-full p-4">
        <div className="font-bold">Laporan Lalin Harian</div>
        <div className="mt-2">
          <Table data={data} />
        </div>
        <Pagination totalPage={detailData.total_pages ?? 0} currentPage={detailData.current_pages ?? 0} row={listRows} onPageChange={() => {}} onRowChange={() => {}} />
      </div>
    </div>
  )
}
