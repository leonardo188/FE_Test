"use client"

import { getDataGerbangs } from "@/app/api/dashboard";
import Table from "@/components/table";
import { mdiPlusBoxOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { id } from "date-fns/locale";
import { useEffect, useState } from "react";

export default function MasterGerbang() {
  interface DataRow {
    No: number;
    Ruas: string;
    Gerbang: string;
    Aksi: any;
  }

  const [data, setData] = useState<DataRow[]>([])

  const getData = async () => {
    try {
      const response = await getDataGerbangs()
      if (response.code === 200) {
        const newData: DataRow[] = response.data.rows.rows.map((item: any) => ({
          No: item.id,
          Ruas: item.NamaCabang,
          Gerbang: item.NamaGerbang,
          Aksi: '',
        }));

        setData(newData)
      }
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  useEffect(() => {
    getData()
  }, [])
  

  return (
    <div className="flex p-4 bg-gray-200 min-h-full">
      <div className="flex flex-col bg-white text-black w-full p-4">
        <div className="font-bold">Master Data Gerbang</div>
        <div className="flex flex-row justify-between items-center mt-6">
          <div>Search</div>
          <button type="submit" 
            className={`flex flex-row ml-4 text-white font-bold p-2 rounded bg-gray-800 hover:bg-gray-700 transition duration-200`}>
              <Icon className="mr-2" path={mdiPlusBoxOutline} size={1} color="gray" />
              Tambah
          </button>
        </div>
        <div className="mt-2">
          <Table data={data} />
        </div>
      </div>
    </div>
  );
}
