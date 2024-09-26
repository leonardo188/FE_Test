"use client"

import { getDataGerbangs } from "@/app/api/dashboard";
import Pagination from "@/components/pagination";
import Table from "@/components/table";
import { mdiMagnify, mdiPlusBoxOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useState } from "react";

export default function MasterGerbang() {
  interface DataRow {
    No: number;
    Ruas: string;
    Gerbang: string;
    Aksi: any;
  }

  const listRows = [5, 25, 50, 100]
  const [detailData, setDetailData] = useState<{ 
    total_pages: number;
    current_pages: number; 
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
    try {
      const response = await getDataGerbangs()
      if (response.code === 200) {
        const newData: DataRow[] = response.data.rows.rows.map((item: any, index: number) => ({
          No: index + 1,
          Ruas: item.NamaCabang,
          Gerbang: item.NamaGerbang,
          Aksi: '',
        }));

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
    setSearch(e.target.value);
  }
  

  return (
    <div className="flex p-4 bg-gray-200 min-h-full">
      <div className="flex flex-col bg-white text-black w-full p-4">
        <div className="font-bold">Master Data Gerbang</div>
        <div className="flex flex-row justify-between items-center mt-6">
          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <Icon path={mdiMagnify} size={1} color="gray" />
            <input
                type="text"
                value={search}
                onChange={handleInputChange}
                placeholder="Search..."
                className="ml-2 outline-none"
              />
          </div>
          <button type="submit" 
            className={`flex flex-row ml-4 text-white font-bold p-2 rounded bg-gray-800 hover:bg-gray-700 transition duration-200`}>
              <Icon className="mr-2" path={mdiPlusBoxOutline} size={1} color="white" />
              Tambah
          </button>
        </div>
        <div className="mt-2">
          <Table data={data} />
        </div>
        <Pagination totalPage={detailData.total_pages ?? 0} currentPage={detailData.current_pages ?? 0} row={listRows} onPageChange={() => {}} onRowChange={() => {}} />
      </div>
    </div>
  );
}
